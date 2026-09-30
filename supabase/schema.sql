-- Loopi: ejecutar una sola vez en Supabase > SQL Editor.
-- Después sustituye TU_CORREO@EJEMPLO.COM por el correo con el que entrarás
-- en Loopi Admin y ejecuta la última línea indicada abajo.

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_loopi_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 160),
  body text not null check (char_length(body) between 20 and 20000),
  category text not null,
  language text not null check (language in ('es','en','fr','pt','it','de')),
  author text not null default 'Anónimo',
  is_anonymous boolean not null default false,
  privacy_request text,
  contact_email text,
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories(id) on delete cascade,
  body text not null check (char_length(body) between 2 and 4000),
  author text not null default 'Anónimo',
  is_anonymous boolean not null default false,
  contact_email text,
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.stories enable row level security;
alter table public.comments enable row level security;

-- Se eliminan solo estas políticas para poder repetir el script sin errores.
drop policy if exists "admins see themselves" on public.admins;
drop policy if exists "public sends stories" on public.stories;
drop policy if exists "public reads published stories" on public.stories;
drop policy if exists "admins manage stories" on public.stories;
drop policy if exists "public sends comments" on public.comments;
drop policy if exists "public reads published comments" on public.comments;
drop policy if exists "admins manage comments" on public.comments;

create policy "admins see themselves" on public.admins for select using (user_id = auth.uid());
create policy "public sends stories" on public.stories for insert to anon, authenticated with check (status = 'pending');
create policy "public reads published stories" on public.stories for select using (status = 'published');
create policy "admins manage stories" on public.stories for all using (public.is_loopi_admin()) with check (public.is_loopi_admin());
create policy "public sends comments" on public.comments for insert to anon, authenticated with check (status = 'pending');
create policy "public reads published comments" on public.comments for select using (status = 'published');
create policy "admins manage comments" on public.comments for all using (public.is_loopi_admin()) with check (public.is_loopi_admin());

-- 1) Entra una vez en Loopi Admin con tu correo para crear el usuario.
-- 2) En Authentication > Users copia su UUID y ejecuta:
-- insert into public.admins (user_id) values ('PEGA_AQUI_EL_UUID_DE_TU_USUARIO'));
