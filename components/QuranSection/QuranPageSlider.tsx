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
    <aside className="border-e bg-white/60 rounded-lg px-4 py-4 ml-10 my-5 w-full max-h-[calc(100vh-40px)] space-y-3 overflow-y-auto scroll-smooth overscroll-contain relative">
      <div className="flex items-start">
        <h1 className="text-2xl text-se-primary-light">Surahs</h1>
      </div>

      {/* 2. Sticky Wrapper: Pinned to top, z-index keeps it above cards, bg-white hides cards scrolling under it */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 py-2">
        <Input
          placeholder={`Search for Surahs...`}
          className="w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 3. Removed overflow-y-auto from here so the main aside handles the scrolling smoothly */}
      <div className="flex flex-col items-center space-y-2">
        {surah ? (
          surah
            .filter((surah) =>
              surah.englishName.toLowerCase().includes(search.toLowerCase()),
            )
            .map(
              ({
                name,
                englishName,
                englishNameTranslation,
                numberOfAyahs,
                revelationType,
                number,
              }) => (
                <SurahCard
                  name={name}
                  key={number}
                  englishName={englishName}
                  englishNameTranslation={englishNameTranslation}
                  numberOfAyahs={numberOfAyahs}
                  revelationType={revelationType}
                  number={number}
                />
              ),
            )
        ) : (
          <h1 className="text-center text-2xl">Fetch Surahs...</h1>
        )}
      </div>
    </aside>
  );
}
