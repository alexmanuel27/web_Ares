-- CubanWaterLab · Ciencia ciudadana — moderación (fase 1b)
-- Pegar en Supabase → SQL Editor → Run. Antes de ejecutar, cambia TU_CORREO@EJEMPLO.COM (última línea)
-- por el correo del usuario moderador que creaste en Authentication → Users.

-- Lista de moderadores. Sin políticas RLS: solo se edita desde el SQL Editor.
create table if not exists public.moderators (email text primary key);
alter table public.moderators enable row level security;
revoke all on public.moderators from anon, authenticated;

create or replace function public.is_moderator() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.moderators m
    where lower(m.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_moderator() from public;
grant execute on function public.is_moderator() to authenticated;

-- Los moderadores pueden leer todo, cambiar SOLO la columna status y borrar.
grant select, delete on public.reports to authenticated;
grant update (status) on public.reports to authenticated;

drop policy if exists "moderadores leen" on public.reports;
create policy "moderadores leen" on public.reports
  for select to authenticated using (public.is_moderator());

drop policy if exists "moderadores actualizan" on public.reports;
create policy "moderadores actualizan" on public.reports
  for update to authenticated using (public.is_moderator()) with check (public.is_moderator());

drop policy if exists "moderadores borran" on public.reports;
create policy "moderadores borran" on public.reports
  for delete to authenticated using (public.is_moderator());

-- Tu correo de moderador (el mismo del usuario creado en Authentication → Users):
insert into public.moderators (email) values ('TU_CORREO@EJEMPLO.COM') on conflict do nothing;
