-- CubanWaterLab · Ciencia ciudadana — cuentas opcionales y ranking (fase 1c)
-- Pegar en Supabase → SQL Editor → Run. Se puede ejecutar más de una vez.
-- Requiere haber ejecutado antes schema.sql (y, si vas a moderar, moderation.sql).
--
-- Ajustes en Authentication (panel de Supabase) para que las cuentas funcionen:
--   · Sign In / Providers → "Allow new users to sign up": ACTIVADO
--   · Sign In / Providers → Email → "Confirm email": ACTIVADO (las cuentas usan correo real + apodo público)
--   · URL Configuration → Site URL: https://cubanwaterlab.com  y  Redirect URLs: https://cubanwaterlab.com/**
--   · Para enviar correos de verdad, configura un SMTP propio (Authentication → Emails → SMTP Settings); el servicio gratis de Supabase solo permite unos pocos correos por hora.

-- ───────────── Perfiles (el apodo es público) ─────────────
create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  nickname   text not null check (nickname ~ '^[A-Za-z0-9_-]{3,24}$'),
  created_at timestamptz not null default now()
);
create unique index if not exists profiles_nickname_lower on public.profiles (lower(nickname));

alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
drop policy if exists "apodos públicos" on public.profiles;
create policy "apodos públicos" on public.profiles for select to anon, authenticated using (true);

-- Al crearse un usuario se crea su perfil con el apodo enviado por la web.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, nickname)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'nickname'), ''), 'user_' || substr(new.id::text, 1, 8)))  -- nunca se deriva del correo
  on conflict (user_id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────── Reportes ligados a una cuenta (opcional) ─────────────
alter table public.reports
  add column if not exists user_id uuid default auth.uid() references public.profiles(user_id) on delete set null;
create index if not exists reports_user_idx on public.reports (user_id);

-- Enviar: anónimo, o con cuenta propia (nadie puede atribuir un reporte a otra persona).
drop policy if exists "anon puede enviar reportes" on public.reports;
create policy "anon puede enviar reportes" on public.reports
  for insert to anon, authenticated
  with check (status = 'pending' and (user_id is null or user_id = auth.uid()));

-- Cada persona puede ver el estado de sus propios reportes.
grant select on public.reports to authenticated;
drop policy if exists "usuarios ven los suyos" on public.reports;
create policy "usuarios ven los suyos" on public.reports
  for select to authenticated using (user_id = auth.uid());

-- Vista pública: ahora incluye el apodo (solo de reportes aprobados).
create or replace view public.reports_public as
  select r.id, r.observed_at, r.lat, r.lon, r.color, r.surface, r.odor, r.anomalies, r.comment,
         r.fishing_now, r.catch_vs_normal, r.depth, r.photo_path, p.nickname
  from public.reports r
  left join public.profiles p on p.user_id = r.user_id
  where r.status = 'approved';
grant select on public.reports_public to anon, authenticated;

-- ───────────── Ranking (solo cantidad de reportes aprobados) ─────────────
create or replace function public.ranking(period text default 'month')
returns table (nickname text, total bigint)
language sql stable security definer set search_path = public as $$
  select p.nickname, count(*)::bigint
  from public.reports r
  join public.profiles p on p.user_id = r.user_id
  where r.status = 'approved'
    and (period <> 'month'
         or r.observed_at >= (date_trunc('month', now() at time zone 'America/Havana') at time zone 'America/Havana'))
  group by p.nickname
  order by count(*) desc, min(r.observed_at) asc
  limit 20;
$$;
revoke all on function public.ranking(text) from public;
grant execute on function public.ranking(text) to anon, authenticated;
