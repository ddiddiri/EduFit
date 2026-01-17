import { z } from "zod";
import { EducationInfoSchema } from "../../entities/education/model/education.schema";
import { SchoolInfoSchema } from "../../entities/school/model/school.schema";
import { StudentInfoSchema } from "../../entities/student/model/student.schema";
import { TeacherInfoSchema } from "../../entities/teacher/model/teacher.schema";

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
