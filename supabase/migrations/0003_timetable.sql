create table if not exists public.timetable_entries (
  id bigint generated always as identity primary key,
  day smallint not null check (day between 0 and 6),
  start_time time not null,
  end_time time not null,
  title text not null check (char_length(title) between 1 and 120),
  kind text not null check (kind in ('LEC', 'SEC', 'ACT')),
  section smallint check (section between 1 and 5),
  room text check (char_length(room) <= 60),
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

create unique index if not exists timetable_entries_slot_key
  on public.timetable_entries (day, start_time, kind, coalesce(section, 0));

alter table public.timetable_entries enable row level security;

create policy "Authenticated users can read timetable"
  on public.timetable_entries for select
  to authenticated
  using (true);

create policy "Admins manage timetable"
  on public.timetable_entries for all
  to authenticated
  using ((select role from public.profiles where id = (select auth.uid())) = 'admin')
  with check ((select role from public.profiles where id = (select auth.uid())) = 'admin');

revoke all on public.timetable_entries from anon, authenticated;
grant select, insert, update, delete on public.timetable_entries to authenticated;

with s(code, title) as (values
  ('PHY', 'فسيولوجيا عام'),
  ('BCH', 'أساسيات الكيمياء الحيوية والبيولوجيا الجزيئية'),
  ('ANA', 'التشريح المقارن'),
  ('POU', 'إنتاج الدواجن والأرانب'),
  ('NUT', 'أساسيات التغذية وأمراض سوء التغذية'),
  ('OPT', 'مادة اختيارية عامة'),
  ('ACT', 'أنشطة طالبية')
),
e(day, st, en, code, kind, sec, room) as (values
  (0, '12:00', '13:30', 'BCH', 'LEC', null, 'مدرج 2'),
  (0, '13:30', '15:00', 'PHY', 'LEC', null, 'مدرج 2'),
  (1, '12:00', '14:00', 'ANA', 'LEC', null, 'مدرج 2'),
  (2, '12:00', '13:30', 'PHY', 'LEC', null, 'مدرج 2'),
  (2, '13:30', '15:00', 'BCH', 'LEC', null, 'مدرج 2'),
  (3, '11:00', '12:00', 'POU', 'LEC', null, 'مدرج 2'),
  (3, '12:00', '13:00', 'OPT', 'LEC', null, 'مدرج 2'),
  (4, '11:00', '13:00', 'NUT', 'LEC', null, 'مدرج 2'),
  (1, '17:00', '18:00', 'ACT', 'ACT', null, null),

  (0, '09:00', '12:00', 'BCH', 'SEC', 1, null),
  (1, '09:00', '12:00', 'NUT', 'SEC', 1, 'قاعة الفرقة الثالثة'),
  (2, '09:00', '12:00', 'PHY', 'SEC', 1, null),
  (3, '09:00', '11:00', 'POU', 'SEC', 1, 'قاعة الفرقة الثالثة'),
  (3, '13:00', '15:00', 'ANA', 'SEC', 1, null),
  (4, '09:00', '11:00', 'OPT', 'SEC', 1, 'قاعة قسم الولادة'),

  (0, '09:00', '12:00', 'PHY', 'SEC', 2, null),
  (1, '09:00', '12:00', 'NUT', 'SEC', 2, null),
  (2, '09:00', '12:00', 'BCH', 'SEC', 2, null),
  (3, '09:00', '11:00', 'POU', 'SEC', 2, 'قاعة الفرقة الثالثة'),
  (3, '13:00', '15:00', 'ANA', 'SEC', 2, null),
  (4, '13:00', '15:00', 'OPT', 'SEC', 2, null),

  (0, '10:00', '12:00', 'POU', 'SEC', 3, 'قاعة الفرقة الثالثة'),
  (1, '09:00', '12:00', 'BCH', 'SEC', 3, null),
  (2, '09:00', '12:00', 'PHY', 'SEC', 3, null),
  (3, '09:00', '11:00', 'ANA', 'SEC', 3, null),
  (4, '09:00', '11:00', 'NUT', 'SEC', 3, 'مدرج 2'),
  (4, '13:00', '15:00', 'OPT', 'SEC', 3, null),

  (0, '09:00', '12:00', 'PHY', 'SEC', 4, null),
  (1, '14:00', '17:00', 'BCH', 'SEC', 4, null),
  (2, '10:00', '12:00', 'ANA', 'SEC', 4, null),
  (3, '13:00', '15:00', 'POU', 'SEC', 4, 'قاعة الفرقة الرابعة'),
  (4, '09:00', '11:00', 'NUT', 'SEC', 4, 'مدرج 2'),
  (4, '13:00', '15:00', 'OPT', 'SEC', 4, 'قاعة قسم الولادة'),

  (0, '10:00', '12:00', 'POU', 'SEC', 5, 'قاعة الفرقة الثالثة'),
  (1, '09:00', '12:00', 'PHY', 'SEC', 5, null),
  (3, '09:00', '11:00', 'ANA', 'SEC', 5, null),
  (3, '13:00', '16:00', 'BCH', 'SEC', 5, null),
  (4, '09:00', '11:00', 'NUT', 'SEC', 5, 'مدرج 2'),
  (4, '13:00', '15:00', 'OPT', 'SEC', 5, 'قاعة قسم الولادة')
)
insert into public.timetable_entries (day, start_time, end_time, title, kind, section, room)
select e.day, e.st::time, e.en::time, s.title, e.kind, e.sec::smallint, e.room
from e join s on s.code = e.code
on conflict do nothing;
