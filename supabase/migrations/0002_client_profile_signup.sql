grant insert on public.profiles to authenticated;

create policy "Users can create their own user profile"
  on public.profiles for insert
  to authenticated
  with check (
    (select auth.uid()) = id
    and role = 'user'
  );