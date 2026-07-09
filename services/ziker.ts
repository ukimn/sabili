import { zikerTypes } from "@/lib/types";

const BASE_URL = "https://ahegazy.github.io/muslimKit/json/";

const azkarTypes = [
  "azkar_sabah.json",
  "azkar_messa.json",
  "PostPrayer_azkar.json",
];

export async function getZiker(typeOfZiker: number): Promise<zikerTypes> {
  const response = await fetch(`${BASE_URL}/${azkarTypes[typeOfZiker]}`);

  if (!response.ok) {
    throw new Error(`HTTP ERROR! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
