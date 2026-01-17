import { supabase } from "@/shared/constant/supabase";
import { Tables } from "@/shared/model/database.types";
import { useQuery } from "@tanstack/react-query";

export type Submission = Tables<"form_submissions"> & {
  school_info: Pick<Tables<"school_info">, "name">[];
  student_info: Pick<
    Tables<"student_info">,
    "target_grade" | "student_count" | "level"
  >[];
};

export const useSubmissions = (userId: string | undefined) => {
  return useQuery<Submission[]>({
    queryKey: ["submissions", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const { data, error } = await supabase
        .from("form_submissions")
        .select(
          "*, school_info(name), student_info(target_grade, student_count, level)",
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as Submission[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
  });
};