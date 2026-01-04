import { z } from "zod";
import { EducationInfoSchema } from "./education.schema";
import { SchoolInfoSchema } from "./school.schema";
import { StudentInfoSchema } from "./student.schema";
import { TeacherInfoSchema } from "./teacher.schema";

export const step1Schema = SchoolInfoSchema.extend(TeacherInfoSchema.shape);
export const step2Schema = StudentInfoSchema;
export const step3Schema = EducationInfoSchema;

export const TotalFormSchema = z.object({
  ...SchoolInfoSchema.shape,
  ...TeacherInfoSchema.shape,
  ...StudentInfoSchema.shape,
  ...EducationInfoSchema.shape,
});

export type TotalForm = z.infer<typeof TotalFormSchema>;