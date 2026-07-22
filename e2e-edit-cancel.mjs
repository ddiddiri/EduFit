// 프로덕션 E2E: ① 학교 선택 시 지역 자동입력 ② 제출 ③ 수정 재신청 ④ 취소
import { chromium } from "playwright";

const BASE = "https://classfit-ai.pages.dev";
const shot = (p, name) => p.screenshot({ path: `test-shots/${name}.png`, fullPage: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("dialog", (d) => d.accept());

const results = [];
const check = (name, ok, extra = "") => {
  results.push(`${ok ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);
  if (!ok) console.log(`FAIL ${name} ${extra}`);
};

try {
  // ── form1: 학교 검색 → 지역 자동입력 ──
  await page.goto(`${BASE}/form1`, { waitUntil: "networkidle" });
  await page.getByText("초등학교", { exact: true }).first().click();
  await page.getByPlaceholder("학교를 검색하세요").click({ force: true });
  await page.getByPlaceholder("학교명을 입력하세요 (2글자 이상)").fill("일곡초등학교");
  await page.getByText("일곡초등학교", { exact: true }).first().click();
  await page.waitForTimeout(500);

  const areaValue = await page
    .getByPlaceholder("위에서 학교를 검색하면 자동으로 입력됩니다")
    .inputValue();
  check("지역 자동입력", /북구/.test(areaValue), `값="${areaValue}"`);

  // 지역 필드가 직접 타이핑 불가(readOnly)인지
  const areaReadonly = await page
    .getByPlaceholder("위에서 학교를 검색하면 자동으로 입력됩니다")
    .evaluate((el) => el.readOnly);
  check("지역 필드 읽기전용", areaReadonly === true);
  await shot(page, "e2e1-form1-autofill");

  await page.getByPlaceholder("예: 홍길동").fill("E2E테스트교사");
  await page.getByPlaceholder("예: 010-1234-5678").fill("010-0000-0000");
  await page.getByText("다음", { exact: true }).first().click();

  // ── form2 ── (탭 구조상 form1이 함께 마운트되어 있어 마지막 요소를 클릭)
  await page.waitForURL("**/form2");
  await page.getByText("3-4학년", { exact: true }).last().click();
  await page.getByPlaceholder("예: 25").fill("20");
  await page.getByText("초급", { exact: true }).last().click();
  await page.getByText("다음", { exact: true }).last().click();

  // ── form3: 제출 ──
  await page.waitForURL("**/form3");
  await page.getByText("컴퓨터실 (1인 1PC)").click();
  await page.getByText("AI 기초 체험").click();
  await page.getByPlaceholder(/1~2차시/).fill("E2E 1차시");
  await page.getByPlaceholder(/3월 둘째 주/).fill("E2E 일정");
  await page.getByText("위 내용을 확인하였으며", { exact: false }).click();
  await page.getByText("신청 완료", { exact: true }).click();
  await page.waitForURL(/\/(\(tabs\))?$|\/$/, { timeout: 20000 });
  check("신규 제출", true);

  // ── my-submissions: 수정하기 ──
  await page.goto(`${BASE}/my-submissions`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=일곡초등학교", { timeout: 15000 });
  await shot(page, "e2e2-my-submissions");
  const editBtn = page.getByText("수정하기", { exact: true }).first();
  check("수정하기 버튼 표시", await editBtn.isVisible());
  await editBtn.click();

  await page.waitForURL("**/form1", { timeout: 15000 });
  const prefilledSchool = await page.getByPlaceholder("학교를 검색하세요").inputValue();
  check("수정 모드 학교명 프리필", prefilledSchool === "일곡초등학교", `값="${prefilledSchool}"`);
  await shot(page, "e2e3-edit-prefill");

  // 수정 재제출 (교사 정보만 재입력)
  await page.getByPlaceholder("예: 홍길동").fill("E2E수정교사");
  await page.getByPlaceholder("예: 010-1234-5678").fill("010-1111-1111");
  await page.getByText("다음", { exact: true }).first().click();
  await page.waitForURL("**/form2");
  // 프리필 확인: 학생수 20 유지되는지
  const cnt = await page.getByPlaceholder("예: 25").inputValue();
  check("수정 모드 학생수 프리필", cnt === "20", `값="${cnt}"`);
  await page.getByText("다음", { exact: true }).last().click();
  await page.waitForURL("**/form3");
  const period = await page.getByPlaceholder(/1~2차시/).inputValue();
  check("수정 모드 기간 프리필", period === "E2E 1차시", `값="${period}"`);
  await page.getByText("위 내용을 확인하였으며", { exact: false }).click();
  await page.getByText("신청 완료", { exact: true }).click();
  await page.waitForURL(/\/(\(tabs\))?$|\/$/, { timeout: 20000 });

  // 기존 건이 취소됨으로 바뀌었는지
  await page.goto(`${BASE}/my-submissions`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=일곡초등학교", { timeout: 15000 });
  const cancelledBadges = await page.getByText("취소됨", { exact: true }).count();
  check("수정 시 기존 건 자동취소", cancelledBadges >= 1, `취소됨 배지 ${cancelledBadges}개`);
  await shot(page, "e2e4-after-edit");

  // ── 신청 취소 버튼 ──
  const cancelBtn = page.getByText("신청 취소", { exact: true }).first();
  check("신청 취소 버튼 표시", await cancelBtn.isVisible());
  await cancelBtn.click();
  await page.waitForTimeout(2000);
  const cancelledAfter = await page.getByText("취소됨", { exact: true }).count();
  check("취소 동작", cancelledAfter >= 2, `취소됨 배지 ${cancelledAfter}개`);
  await shot(page, "e2e5-after-cancel");
} catch (e) {
  console.log("ERROR:", e.message);
  await shot(page, "e2e-error");
} finally {
  console.log("\n===== RESULTS =====");
  for (const r of results) console.log(r);
  await browser.close();
}
