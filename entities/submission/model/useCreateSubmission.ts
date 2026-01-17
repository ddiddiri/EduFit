import { supabase } from "@/shared/constant/supabase";
import { TotalForm } from "@/shared/model/form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

interface CreateSubmissionParams {
  data: TotalForm;
  userId: string;
}

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, userId }: CreateSubmissionParams) => {
      // 1. form_submissions 테이블에 제출 생성
      const { data: submission, error: subError } = await supabase
        .from("form_submissions")
        .insert([
          {
            status: "접수완료",
            user_id: userId,
          },
        ])
        .select()
        .single();

      if (subError) throw subError;

      const submissionId = submission.id;

      // 2. 관련 정보들을 병렬로 삽입
      const results = await Promise.all([
        supabase.from("school_info").insert([
          {
            submission_id: submissionId,
            type: data.school_type,
            name: data.school_name,
            area: data.school_area,
          },
        ]),
        supabase.from("teacher_info").insert([
          {
            submission_id: submissionId,
            name: data.teacher_name,
            phone: data.teacher_phone,
          },
        ]),
        supabase.from("student_info").insert([
          {
            submission_id: submissionId,
            target_grade: data.student_target_grade,
            student_count: parseInt(data.student_number) || 0,
            level: data.student_level,
          },
        ]),
        supabase.from("education_config").insert([
          {
            submission_id: submissionId,
            resources: data.school_resource,
            goals: data.education_goal,
            period: data.education_period,
            date: data.education_date,
          },
        ]),
      ]);

      const firstError = results.find((r) => r.error)?.error;
      if (firstError) throw firstError;

      // 3. SecureStore에 제출 ID 저장
      const existingIdsJson = await SecureStore.getItemAsync("my_submissions");
      const existingIds = existingIdsJson ? JSON.parse(existingIdsJson) : [];
      const newIds = [...existingIds, submissionId];
      await SecureStore.setItemAsync("my_submissions", JSON.stringify(newIds));

      // 4. 알림 전송: 사용자 전용 채널 (user-notif:USER_ID)
      await supabase.channel(`user-notif:${userId}`).send({
        type: "broadcast",
        event: "submission-complete",
        payload: {
          message: `${data.teacher_name}님, ${data.school_name} 신청이 완료되었습니다!`,
        },
      });

      return submission;
    },
    onSuccess: (_, variables) => {
      // 제출 내역 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({
        queryKey: ["submissions", variables.userId],
      });
    },
  });
};