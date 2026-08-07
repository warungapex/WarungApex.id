-- Admin write policies (authenticated users = admin only)
-- INSERT
create policy "accounts_admin_insert"
  on public.accounts
  for insert
  to authenticated
  with check (true);

-- UPDATE
create policy "accounts_admin_update"
  on public.accounts
  for update
  to authenticated
  using (true)
  with check (true);

-- DELETE
create policy "accounts_admin_delete"
  on public.accounts
  for delete
  to authenticated
  using (true);
