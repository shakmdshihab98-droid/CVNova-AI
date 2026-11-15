-- ===== Tables =====
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  email text,
  language text default 'en',
  role text default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  template_id text default 'modern-01',
  title text default 'Untitled Resume',
  content jsonb default '{"schemaVersion":1,"personalInfo":{"fullName":""},"summary":"","experience":[],"education":[],"skills":[]}'::jsonb,
  status text default 'draft',
  revision integer default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_resumes_user on resumes(user_id);

create table if not exists ai_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  prompt text,
  response text,
  provider text,
  created_at timestamptz default now()
);

create table if not exists download_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  resume_id uuid references resumes(id) on delete cascade,
  status text default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  admin_note text,
  requested_at timestamptz default now(),
  reviewed_at timestamptz
);

-- ===== Auto profile on signup =====
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ===== RLS =====
alter table profiles enable row level security;
alter table resumes enable row level security;
alter table download_requests enable row level security;
alter table ai_requests enable row level security;

drop policy if exists "own profile select" on profiles;
create policy "own profile select" on profiles for select using (auth.uid() = id);

drop policy if exists "own profile update" on profiles;
create policy "own profile update" on profiles for update using (auth.uid() = id);

drop policy if exists "own resumes" on resumes;
create policy "own resumes" on resumes for all using (auth.uid() = user_id);

drop policy if exists "own downloads" on download_requests;
create policy "own downloads" on download_requests for all using (auth.uid() = user_id);

drop policy if exists "own ai" on ai_requests;
create policy "own ai" on ai_requests for all using (auth.uid() = user_id);
