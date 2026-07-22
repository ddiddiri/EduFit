-- 테스트 데이터 정리 (E2E 교사명 기준 + 구 테스트 학교 3건)
delete from form_submissions
 where id in (select submission_id from teacher_info where name like 'E2E%')
    or id in (select submission_id from school_info
               where name in ('테스트중학교','실전테스트고등학교','프로덕션테스트초등학교'));

select s.name, f.status, f.created_at
  from form_submissions f
  join school_info s on s.submission_id = f.id
 order by f.created_at;
