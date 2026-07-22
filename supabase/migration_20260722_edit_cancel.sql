-- 2026-07-22: 신청 수정/취소 기능용 마이그레이션
-- 사용법: Supabase 대시보드 > SQL Editor에 전체 붙여넣기 후 Run

-- 1) 수정 프리필용: education_config 조회 허용 (개인정보 아님 — teacher_info는 계속 차단)
create policy "anon select" on public.education_config
  for select to anon, authenticated using (true);

-- 2) 신청 취소: form_submissions.status 컬럼만 수정 허용 (다른 컬럼은 컬럼 권한으로 차단)
revoke update on table public.form_submissions from anon, authenticated;
grant update (status) on table public.form_submissions to anon, authenticated;

create policy "anon update status" on public.form_submissions
  for update to anon, authenticated using (true) with check (true);
