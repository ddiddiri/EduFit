import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Alert, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CheckboxItem,
  ErrorMessage,
  FormButton,
  FormHeader,
  FormInput,
} from "../../components/FormUI";
import { supabase } from "../../constants/supabase";
import {
  getEditingSubmissionId,
  setEditingSubmissionId,
} from "../../services/editSession";
import { getItem, setItem } from "../../services/storage";
import { TotalForm } from "../../types/form.schema";

export default function Form3Screen() {
  const router = useRouter();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [privacyError, setPrivacyError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<TotalForm>();

  // 노트북/태블릿은 기종(OS)에 따라 수업 가능한 도구가 달라 하위 선택을 받는다
  const resourceOptions = [
    { label: "컴퓨터실 (1인 1PC)", value: "컴퓨터실" },
    { label: "노트북 보유", value: "노트북" },
    { label: "태블릿 보유", value: "태블릿" },
    { label: "빔프로젝터 또는 TV", value: "빔프로젝터" },
    { label: "IoT/메이커 장비 있음", value: "IoT/메이커장비" },
    { label: "없음 (장비 지원 필요)", value: "없음" },
  ];

  const laptopSubOptions = [
    { label: "윈도우 노트북", value: "노트북-윈도우" },
    { label: "웨일북/크롬북", value: "노트북-웨일북/크롬북" },
    { label: "모름 (상담 시 확인)", value: "노트북-모름" },
  ];

  const tabletSubOptions = [
    { label: "아이패드 (iOS)", value: "태블릿-iOS" },
    { label: "갤럭시탭 등 (안드로이드)", value: "태블릿-안드로이드" },
    { label: "서피스 (윈도우)", value: "태블릿-윈도우서피스" },
    { label: "모름 (상담 시 확인)", value: "태블릿-모름" },
  ];

  const deviceCountOptions = [
    { label: "1인 1기기 가능", value: "기기수량-1인1기기" },
    { label: "공유 기기 (모둠/교대 사용)", value: "기기수량-공유" },
    { label: "모름 (상담 시 확인)", value: "기기수량-모름" },
  ];

  const goalOptions = [
    { label: "AI 기초 체험", value: "AI기초" },
    { label: "코딩 기초", value: "코딩기초" },
    { label: "융합형 활동", value: "융합형" },
    { label: "데이터 수업", value: "데이터" },
    { label: "프로젝트형", value: "프로젝트형" },
    { label: "교사 연수", value: "교사연수" },
  ];

  const notify = (message: string) => {
    if (Platform.OS === "web") {
      alert(message);
    } else {
      Alert.alert("알림", message);
    }
  };

  const onSubmit = async (data: TotalForm) => {
    if (!privacyAgreed) {
      setPrivacyError("개인정보 수집·이용에 동의해주세요.");
      return;
    }
    if (submitting) return;
    setSubmitting(true);

    try {
      const { data: submission, error: subError } = await supabase
        .from("form_submissions")
        .insert([
          {
            status: "접수완료",
          },
        ])
        .select()
        .single();

      if (subError) throw subError;

      const submissionId = submission.id;

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

      const existingIdsJson = await getItem("my_submissions");
      const existingIds = existingIdsJson ? JSON.parse(existingIdsJson) : [];
      const newIds = [...existingIds, submissionId];
      await setItem("my_submissions", JSON.stringify(newIds));

      // 수정 재신청이면 기존 신청을 취소 처리 (실패해도 새 신청은 유효하므로 진행)
      const editingId = getEditingSubmissionId();
      if (editingId) {
        const { error: cancelError } = await supabase
          .from("form_submissions")
          .update({ status: "취소됨" })
          .eq("id", editingId);
        if (cancelError) {
          console.error("이전 신청 취소 실패:", cancelError);
        }
        setEditingSubmissionId(null);
      }

      notify(
        editingId
          ? "신청이 수정되었습니다! 확인 후 연락드리겠습니다."
          : "상담 신청이 완료되었습니다! 확인 후 연락드리겠습니다.",
      );
      reset();
      setPrivacyAgreed(false);
      router.push("/");
    } catch (error: any) {
      console.error("Submission Error:", error);
      notify("제출 중 오류가 발생했습니다: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleArray = (
    value: string,
    currentArray: string[],
    onChange: (val: string[]) => void
  ) => {
    let newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    // 상위 항목 해제 시 하위 선택도 함께 제거
    if (value === "노트북" && !newArray.includes("노트북")) {
      newArray = newArray.filter((item) => !item.startsWith("노트북-"));
    }
    if (value === "태블릿" && !newArray.includes("태블릿")) {
      newArray = newArray.filter((item) => !item.startsWith("태블릿-"));
    }
    // 노트북/태블릿 둘 다 해제되면 기기 수량 선택도 제거
    if (!newArray.includes("노트북") && !newArray.includes("태블릿")) {
      newArray = newArray.filter((item) => !item.startsWith("기기수량-"));
    }
    onChange(newArray);
  };

  // 기기 수량은 단일 선택 (라디오처럼 동작)
  const handleSelectDeviceCount = (
    value: string,
    currentArray: string[],
    onChange: (val: string[]) => void
  ) => {
    const withoutCount = currentArray.filter(
      (item) => !item.startsWith("기기수량-")
    );
    onChange(
      currentArray.includes(value) ? withoutCount : [...withoutCount, value]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormHeader title="학교 자원 & 교육 목표 (3/3)" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 46,
          paddingTop: 40,
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-[40px]">
          {/* 학교 자원 섹션 */}
          <View className="gap-[5px]">
            <Text className="text-sm text-black">학교 자원</Text>
            <View className="gap-[10px]">
              <Text className="text-xs text-black">
                학교 보유 자원 (복수 선택)
              </Text>
              <Controller
                control={control}
                name="school_resource"
                render={({ field: { value, onChange } }) => {
                  const selected = value || [];
                  const hasLaptop = selected.includes("노트북");
                  const hasTablet = selected.includes("태블릿");
                  return (
                    <View className="gap-[5px]">
                      {resourceOptions.map((opt) => (
                        <View key={opt.value}>
                          <CheckboxItem
                            label={opt.label}
                            checked={selected.includes(opt.value)}
                            onPress={() =>
                              handleToggleArray(opt.value, selected, onChange)
                            }
                          />
                          {opt.value === "노트북" && hasLaptop && (
                            <View className="ml-6 pl-3 border-l-2 border-indigo-200 gap-[2px]">
                              <Text className="text-xs text-gray-500 mt-1">
                                노트북 종류 (복수 선택)
                              </Text>
                              {laptopSubOptions.map((sub) => (
                                <CheckboxItem
                                  key={sub.value}
                                  label={sub.label}
                                  checked={selected.includes(sub.value)}
                                  onPress={() =>
                                    handleToggleArray(
                                      sub.value,
                                      selected,
                                      onChange
                                    )
                                  }
                                />
                              ))}
                            </View>
                          )}
                          {opt.value === "태블릿" && hasTablet && (
                            <View className="ml-6 pl-3 border-l-2 border-indigo-200 gap-[2px]">
                              <Text className="text-xs text-gray-500 mt-1">
                                태블릿 종류 (복수 선택)
                              </Text>
                              {tabletSubOptions.map((sub) => (
                                <CheckboxItem
                                  key={sub.value}
                                  label={sub.label}
                                  checked={selected.includes(sub.value)}
                                  onPress={() =>
                                    handleToggleArray(
                                      sub.value,
                                      selected,
                                      onChange
                                    )
                                  }
                                />
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                      {(hasLaptop || hasTablet) && (
                        <View className="mt-2 p-3 bg-gray-50 rounded-lg gap-[2px]">
                          <Text className="text-xs text-black font-medium">
                            기기 수량
                          </Text>
                          {deviceCountOptions.map((opt) => (
                            <CheckboxItem
                              key={opt.value}
                              label={opt.label}
                              checked={selected.includes(opt.value)}
                              onPress={() =>
                                handleSelectDeviceCount(
                                  opt.value,
                                  selected,
                                  onChange
                                )
                              }
                            />
                          ))}
                        </View>
                      )}
                      <ErrorMessage message={errors.school_resource?.message} />
                    </View>
                  );
                }}
              />
            </View>
          </View>

          {/* 교육 목표 섹션 */}
          <View className="gap-[5px]">
            <Text className="text-sm text-black">교육 목표</Text>
            <View className="gap-[10px]">
              <Text className="text-xs text-black">교육 목표 선택</Text>
              <Controller
                control={control}
                name="education_goal"
                render={({ field: { value, onChange } }) => (
                  <View className="gap-[5px]">
                    {goalOptions.map((opt) => (
                      <CheckboxItem
                        key={opt.value}
                        label={opt.label}
                        checked={value?.includes(opt.value)}
                        onPress={() =>
                          handleToggleArray(opt.value, value || [], onChange)
                        }
                      />
                    ))}
                    <ErrorMessage message={errors.education_goal?.message} />
                  </View>
                )}
              />
            </View>
          </View>

          {/* 기간 섹션 */}
          <Controller
            control={control}
            name="education_period"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <FormInput
                  label="기간"
                  placeholder="예: 1~2차시 / 3~6차시 / 4주 프로젝트 등"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <ErrorMessage message={errors.education_period?.message} />
              </>
            )}
          />

          {/* 일정 섹션 */}
          <Controller
            control={control}
            name="education_date"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <FormInput
                  label="일정"
                  placeholder="예: 3월 둘째 주 / 5월 10일 등"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <ErrorMessage message={errors.education_date?.message} />
              </>
            )}
          />

          {/* 개인정보 수집·이용 동의 */}
          <View className="gap-[10px] p-4 bg-gray-50 rounded-xl border border-gray-200">
            <Text className="text-sm font-bold text-black">
              개인정보 수집·이용 동의 (필수)
            </Text>
            <Text className="text-xs text-gray-600 leading-5">
              수집 항목: 담당 교사 이름, 연락처{"\n"}
              수집 목적: 출강 수업 상담 및 일정 협의{"\n"}
              보유 기간: 상담 완료 후 6개월 이내 파기{"\n"}
              동의를 거부할 수 있으나, 거부 시 상담 신청이 제한됩니다.
            </Text>
            <CheckboxItem
              label="위 내용을 확인하였으며, 개인정보 수집·이용에 동의합니다."
              checked={privacyAgreed}
              onPress={() => {
                setPrivacyAgreed(!privacyAgreed);
                setPrivacyError(undefined);
              }}
            />
            <ErrorMessage message={privacyError} />
          </View>
        </View>
      </ScrollView>

      <FormButton
        title={submitting ? "제출 중..." : "신청 완료"}
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}
