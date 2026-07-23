import z from "zod";

export const EducationInfoSchema = z.object({
  school_resource: z
    .array(z.string())
    .min(1, '학교 자원을 선택해주세요')
    .superRefine((arr, ctx) => {
      if (arr.includes('노트북') && !arr.some((v) => v.startsWith('노트북-'))) {
        ctx.addIssue({ code: 'custom', message: '노트북 종류를 선택해주세요' });
      }
      if (arr.includes('태블릿') && !arr.some((v) => v.startsWith('태블릿-'))) {
        ctx.addIssue({ code: 'custom', message: '태블릿 종류를 선택해주세요' });
      }
      if (
        (arr.includes('노트북') || arr.includes('태블릿')) &&
        !arr.some((v) => v.startsWith('기기수량-'))
      ) {
        ctx.addIssue({
          code: 'custom',
          message: '기기 수량(1인 1기기/공유)을 선택해주세요',
        });
      }
    }),
  education_goal: z.array(z.string()).min(1, '교육 목표를 선택해주세요'),
  education_period: z.string().min(1, '교육 기간을 선택해주세요'),
  education_date: z.string().min(1, '희망 일정을 선택해주세요'),
});

export type EducationInfo = z.infer<typeof EducationInfoSchema>;