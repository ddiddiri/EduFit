import z from "zod";

export const EducationInfoSchema = z.object({
  school_resource: z.array(z.string()).min(1, '학교 자원을 선택해주세요'),
  education_goal: z.array(z.string()).min(1, '교육 목표를 선택해주세요'),
  education_period: z.string().min(1, '교육 기간을 선택해주세요'),
  education_date: z.string().min(1, '희망 일정을 선택해주세요'),
});

export type EducationInfo = z.infer<typeof EducationInfoSchema>;