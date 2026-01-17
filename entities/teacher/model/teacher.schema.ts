import z from "zod";

export const TeacherInfoSchema = z.object({
  teacher_name: z.string().min(1, '선생님 이름을 입력해주세요'),
  teacher_phone: z.string().min(1, '선생님 전화번호를 입력해주세요'),
});

export type TeacherInfo = z.infer<typeof TeacherInfoSchema>;