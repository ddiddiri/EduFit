import z from "zod";

export const StudentInfoSchema = z.object({
  student_target_grade: z.string().min(1, '대상 학년을 선택해주세요'),
  student_number: z.string().min(1, '학생 수를 입력해주세요'),
  student_level: z.string().min(1, '수준을 선택해주세요'),
});

export type StudentInfo = z.infer<typeof StudentInfoSchema>;