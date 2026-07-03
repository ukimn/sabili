"use client";

import SurahCard from "./SurahCard";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { quranApiResponse } from "@/lib/types";
import { GrIndicator } from "react-icons/gr";

export default function QuranPageSlider() {
  const [surah, setSurah] = useState<quranApiResponse[] | undefined>(undefined);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function requestSurah() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        const surah = await response.json();
        setSurah(surah.data);
      } catch (error) {
        console.log(error);
      }
    }
    requestSurah();
  }, []);

  return (
    <aside className="border-e bg-white/60 rounded-lg px-4 py-4 ml-10 my-5 w-full space-y-3">
      <div className="flex items-start">
        <h1 className="text-2xl text-se-primary-light">Surahs</h1>
      </div>
      <div>
        <Input
          placeholder={`Search for Surahs...`}
          className="w-full"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        {surah ?
          surah.filter((surah) => surah.englishName.toLowerCase().includes(search))
          .map(
            ({
              name,
              englishName,
              englishNameTranslation,
              numberOfAyahs,
              revelationType,
              number,
            }) => {
              return (
                <SurahCard
                  name={name}
                  key={name}
                  englishName={englishName}
                  englishNameTranslation={englishNameTranslation}
                  numberOfAyahs={numberOfAyahs}
                  revelationType={revelationType}
                  number={number}
                />
              );
            },
          ): <h1 className="text-center text-2xl">Fetch Surahs...</h1>}
      </div>
    </aside>
  );
}
