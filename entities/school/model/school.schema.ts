import { z } from "zod";

export const SchoolTypeSchema = z.enum(['고등학교', '중학교', '초등학교']);

export const SchoolInfoSchema = z.object({
  school_type: SchoolTypeSchema,
  school_name: z.string().min(1, '학교 이름을 입력해주세요'),
  school_area: z.string().min(1, '학교 지역을 입력해주세요'),
});

export type SchoolInfo = z.infer<typeof SchoolInfoSchema>;