// 수정 재신청 세션 (메모리 전용)
// 페이지 새로고침 시 사라짐 → 이 경우 신규 신청으로 처리되어 기존 건이 남지만,
// 잘못된 건을 자동 취소하는 것보다 안전한 방향의 실패임.
let editingSubmissionId: string | null = null;

export const setEditingSubmissionId = (id: string | null) => {
  editingSubmissionId = id;
};

export const getEditingSubmissionId = () => editingSubmissionId;
