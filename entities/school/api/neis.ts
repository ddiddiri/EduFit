import { School } from "../model/neis_school.type";

const NEIS_API_KEY = process.env.EXPO_PUBLIC_NEIS_API_KEY;
const BASE_URL = "https://open.neis.go.kr/hub/schoolInfo";

export const fetchSchools = async (schoolName: string): Promise<School[]> => {
  if (!schoolName || schoolName.length < 2) return [];

  try {
    const response = await fetch(
      `${BASE_URL}?KEY=${NEIS_API_KEY}&Type=json&pIndex=1&pSize=20&SCHUL_NM=${encodeURIComponent(schoolName)}`,
    );

    const data = await response.json();

    if (data.schoolInfo) {
      return data.schoolInfo[1].row as School[];
    }

    return [];
  } catch (error) {
    console.error("Error fetching schools:", error);
    return [];
  }
};
