"use client";
import { SurahApiResponse } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// 1. The actual component that fetches and handles the data
function SurahReader() {
  const [ayat, setAyat] = useState<SurahApiResponse | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Explicitly grab the number, fallback to "1" if it's null, empty, or undefined
  const numberOfSurah = searchParams.get("number") || "1";

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function getAyat() {
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${numberOfSurah}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setAyat(result);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch Surah:", error);
        if (isMounted) setLoading(false);
      }
    }

    getAyat();

    return () => {
      isMounted = false;
    };
  }, [numberOfSurah]); // Triggers perfectly whenever the number changes

  if (loading) {
    return <div className="text-black p-4 text-center">Loading Surah...</div>;
  }

  if (!ayat || !ayat.data || !ayat.data.ayahs) {
    return (
      <div className="text-red-500 p-4 text-center">Surah data not found.</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">
        {ayat.data.englishName}
      </h1>

      <div className="w-full space-y-4" dir="rtl">
        {ayat.data.ayahs.map(({ text, numberInSurah }) => {
          return (
            <p
              key={numberInSurah}
              className="text-black text-right text-2xl leading-loose border-b border-gray-100 pb-3"
            >
              {text}{" "}
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mr-2 font-sans">
                {numberInSurah}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

// 2. The default export that wraps it in Suspense to prevent Next.js build/runtime drops
export default function SurahPages() {
  return (
    <Suspense
      fallback={
        <div className="text-center p-4 text-black">
          Initializing wrapper...
        </div>
      }
    >
      <SurahReader />
    </Suspense>
  );
}
