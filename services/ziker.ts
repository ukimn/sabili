import { zikerTypes } from "@/lib/types";

const BASE_URL = "https://ahegazy.github.io/muslimKit/json/";

export const azkarTypes = [
  {
    id: 1,
    name: "Athkar Alsabah",
    file: "azkar_sabah.json",
    desc: "Morning supplications recited after Fajr prayer for protection, blessings, and peace throughout the day.",
  },
  {
    id: 2,
    name: "Athkar Almessa",
    file: "azkar_messa.json",
    desc: "Evening supplications recited after Asr or Maghrib prayer to seek tranquility, forgiveness, and guardianship overnight.",
  },
  {
    id: 3,
    name: "Athkar After Prayer",
    file: "PostPrayer_azkar.json",
    desc: "Supplications and praises (Tasbeeh) recommended directly following the completion of the five daily obligatory prayers.",
  },
];

export async function getZiker(typeOfZiker: number): Promise<zikerTypes> {
  const response = await fetch(
    `${BASE_URL}/${azkarTypes[typeOfZiker]["file"]}`,
  );

  return response.json();
}
