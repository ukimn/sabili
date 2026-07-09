import type { quranApiResponse, SurahApiResponse } from "@/lib/types";

const BASE_URL = "https://api.alquran.cloud/v1";

export async function fetchAllSurahs(): Promise<quranApiResponse[]> {
  const response = await fetch(`${BASE_URL}/surah`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}

export async function fetchSurah(number: string): Promise<SurahApiResponse> {
  const response = await fetch(`${BASE_URL}/surah/${number}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
