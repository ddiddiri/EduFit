export interface School {
  ATPT_OFCDC_SC_CODE: string; // 시도교육청코드
  ATPT_OFCDC_SC_NM: string;   // 시도교육청명
  SD_SCHUL_CODE: string;      // 표준학교코드
  SCHUL_NM: string;           // 학교명
  ENG_SCHUL_NM: string;       // 영문학교명
  SCHUL_KND_SC_NM: string;    // 학교종류명
  LCTN_SC_NM: string;         // 소재지명 (예: "광주광역시") — 실제 NEIS 필드명
  JU_ORG_NM: string;          // 관할조직명
  FOND_SC_NM: string;         // 설립명
  ORG_RDNZC: string;          // 도로명우편번호
  ORG_RDNMA: string;          // 도로명주소
  ORG_RDNDA: string;          // 도로명상세주소
  ORG_TELNO: string;          // 전화번호
  HMPG_ADRES: string;         // 홈페이지주소
  COEDU_SC_NM: string;        // 남녀공학여부
  ORG_FAXNO: string;          // 팩스번호
  HS_GNRL_BUSNS_SC_NM: string; // 고등학교일반실업구분명
  INDST_SPECL_CCL_XIST_YN: string; // 산업체특별학급존재여부
  HS_SC_NM: string;           // 고등학교구분명
  EDC_SNE_YN: string;         // 특수목적고등학교여부
  ENE_BFE_SEHF_SC_NM: string; // 입시전후기구분명
  DGHT_SC_NM: string;         // 주야구분명
  FOND_YMD: string;           // 설립일자
  FO_01_CONV_FOND_YMD: string; // 개교기념일
}

const NEIS_API_KEY = process.env.EXPO_PUBLIC_NEIS_API_KEY;
const BASE_URL = 'https://open.neis.go.kr/hub/schoolInfo';

export const fetchSchools = async (schoolName: string): Promise<School[]> => {
  if (!schoolName || schoolName.length < 2) return [];

  try {
    const response = await fetch(
      `${BASE_URL}?KEY=${NEIS_API_KEY}&Type=json&pIndex=1&pSize=20&SCHUL_NM=${encodeURIComponent(schoolName)}`
    );

    const data = await response.json();

    if (data.schoolInfo) {
      return data.schoolInfo[1].row as School[];
    }

    return [];
  } catch (error) {
    console.error('Error fetching schools:', error);
    return [];
  }
};
