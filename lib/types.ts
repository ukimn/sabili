export interface headerDataTypes {
  title: string;
  url: string;
}

export interface quranApiResponse {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Madinan";
}

export interface surahCardProps {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Madinan";
}
