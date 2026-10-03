create table if not exists public.student_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  section smallint check (section between 1 and 5),
  updated_at timestamptz not null default now()
);

alter table public.student_settings enable row level security;

create policy "own settings select" on public.student_settings
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "own settings insert" on public.student_settings
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own settings update" on public.student_settings
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

revoke all on public.student_settings from anon, authenticated;
grant select, insert, update on public.student_settings to authenticated;
