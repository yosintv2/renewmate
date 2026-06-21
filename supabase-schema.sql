-- RenewMate Database Schema
-- Run this entire file in Supabase SQL Editor → New Query → Run

-- Users table (extends Supabase's built-in auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text,
  phone text,
  plan text default 'free' check (plan in ('free', 'premium', 'fleet')),
  created_at timestamptz default now()
);

-- Auto-create a profile row whenever a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Vehicles table
create table public.vehicles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  vehicle_number text not null,
  vehicle_type text not null check (vehicle_type in ('bike', 'scooter', 'car', 'jeep', 'van', 'truck', 'other')),
  province text not null,
  brand text,
  model text,
  year int,
  tax_expiry date,
  bluebook_expiry date,
  insurance_expiry date,
  pollution_expiry date,
  created_at timestamptz default now()
);

-- Documents table
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  vehicle_id uuid references public.vehicles(id) on delete cascade not null,
  document_type text not null check (document_type in ('bluebook', 'insurance', 'pollution')),
  file_url text not null,
  uploaded_at timestamptz default now()
);

-- Notifications log table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  vehicle_id uuid references public.vehicles(id) on delete cascade not null,
  renewal_type text not null,
  reminder_date date not null,
  sent_at timestamptz,
  status text default 'pending' check (status in ('pending', 'sent', 'failed'))
);

-- Row Level Security (RLS) — users can only see their own data
alter table public.profiles enable row level security;
alter table public.vehicles enable row level security;
alter table public.documents enable row level security;
alter table public.notifications enable row level security;

-- Profiles: users can read and update only their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Vehicles: users can only CRUD their own vehicles
create policy "Users can view own vehicles" on public.vehicles
  for select using (auth.uid() = user_id);
create policy "Users can insert own vehicles" on public.vehicles
  for insert with check (auth.uid() = user_id);
create policy "Users can update own vehicles" on public.vehicles
  for update using (auth.uid() = user_id);
create policy "Users can delete own vehicles" on public.vehicles
  for delete using (auth.uid() = user_id);

-- Documents: users can only CRUD documents for their own vehicles
create policy "Users can view own documents" on public.documents
  for select using (
    exists (select 1 from public.vehicles where id = vehicle_id and user_id = auth.uid())
  );
create policy "Users can insert own documents" on public.documents
  for insert with check (
    exists (select 1 from public.vehicles where id = vehicle_id and user_id = auth.uid())
  );
create policy "Users can delete own documents" on public.documents
  for delete using (
    exists (select 1 from public.vehicles where id = vehicle_id and user_id = auth.uid())
  );
