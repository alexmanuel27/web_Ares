-- CubanWaterLab · Ciencia ciudadana — esquema de Supabase (fase 1: reportes)
-- Pegar completo en Supabase → SQL Editor → Run. Se puede ejecutar más de una vez.

-- ───────────── Reportes ciudadanos ─────────────
create table if not exists public.reports (
  id          uuid primary key,                       -- lo genera el navegador (reintentos sin duplicar)
  created_at  timestamptz not null default now(),
  observed_at timestamptz not null default now(),     -- hora real de la observación (puede enviarse después, sin conexión)
  lat         double precision not null check (lat between -90 and 90),
  lon         double precision not null check (lon between -180 and 180),
  color       text check (color in ('transparente','verde_claro','verde_oscuro','amarillo_marron','rojo_marron','blanco_lechoso','otro')),
  surface     text[] not null default '{}',           -- ver valores en el formulario
  odor        text check (odor in ('normal','ligero','mal_olor','quimico')),
  anomalies   text[] not null default '{}',
  comment     text check (char_length(comment) <= 1000),
  fishing_now boolean,
  catch_vs_normal text check (catch_vs_normal in ('mas','normal','menos')),
  depth       text check (depth in ('somera','media','profunda')),
  photo_path  text check (char_length(photo_path) <= 200),
  name        text check (char_length(name) <= 80),      -- privado
  contact     text check (char_length(contact) <= 120),  -- privado
  lang        text check (lang in ('es','en','fr')),
  status      text not null default 'pending' check (status in ('pending','approved','rejected'))
);

alter table public.reports enable row level security;

-- El público solo puede INSERTAR reportes pendientes. No puede leer la tabla.
drop policy if exists "anon puede enviar reportes" on public.reports;
create policy "anon puede enviar reportes" on public.reports
  for insert to anon, authenticated
  with check (status = 'pending');

revoke all on public.reports from anon, authenticated;
grant insert on public.reports to anon, authenticated;

-- Vista pública: solo reportes aprobados y sin datos personales (name/contact).
create or replace view public.reports_public as
  select id, observed_at, lat, lon, color, surface, odor, anomalies, comment,
         fishing_now, catch_vs_normal, depth, photo_path
  from public.reports
  where status = 'approved';

grant select on public.reports_public to anon, authenticated;

-- ───────────── Fotos ─────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('report-photos', 'report-photos', true, 1048576, array['image/jpeg'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "anon puede subir fotos" on storage.objects;
create policy "anon puede subir fotos" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'report-photos');

-- Moderación: en Table Editor → reports, cambiar la columna status a 'approved' (o 'rejected').
