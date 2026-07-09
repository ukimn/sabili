"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AyahCard from "./AyahCard";
import { useSurah } from "@/hooks/useQuran";
import { motion } from "motion/react";
import { BookOpen, Layers } from "lucide-react";

function SurahReader() {
  const searchParams = useSearchParams();
  const numberOfSurah = searchParams.get("number") || "1";

  const { data: ayat, isLoading, isError } = useSurah(numberOfSurah);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-se-primary/10 bg-white/50 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="h-9 w-9 rounded-xl bg-se-primary/10" />
              <div className="h-4 w-16 rounded bg-se-primary/10" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-full rounded bg-se-primary/5" />
              <div className="h-6 w-3/4 rounded bg-se-primary/5" />
              <div className="h-6 w-1/2 rounded bg-se-primary/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError || !ayat?.data?.ayahs) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-12 text-center">
        <BookOpen className="mb-3 h-10 w-10 text-red-300" />
        <h3 className="text-lg font-semibold text-red-600">
          Unable to load Surah
        </h3>
        <p className="mt-1 text-sm text-red-500">
          Please try selecting a different surah or refresh the page.
        </p>
      </div>
    );
  }

  const { data: surahData } = ayat;

  return (
    <div className="space-y-6">
      {/* Surah Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-se-primary/10 bg-white/60 p-6 text-center shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-se-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-se-accent">
            Surah #{surahData.number}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-se-primary md:text-4xl">
          {surahData.englishName}
        </h1>
        <p className="text-lg text-text-muted">
          {surahData.englishNameTranslation}
        </p>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-se-primary/10 px-3 py-1 text-[11px] font-semibold text-se-primary">
            {surahData.revelationType}
          </span>
          <span className="text-[11px] text-text-muted">
            {surahData.numberOfAyahs} verses
          </span>
        </div>
        <div className="divider-gold mt-1 w-32" />
      </motion.div>

      {/* Ayah Cards */}
      <div className="space-y-4" dir="rtl">
        {surahData.ayahs.map((ayah, index) => (
          <motion.div
            key={ayah.numberInSurah}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.015, duration: 0.35 }}
          >
            <AyahCard
              text={ayah.text}
              sajda={ayah.sajda}
              number={ayah.numberInSurah}
            />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="divider-gold w-full" />
      <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted/40">
        End of Surah {surahData.englishName}
      </p>
    </div>
  );
}

export default function SurahPages() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-se-primary/30 border-t-se-primary" />
            <p className="text-sm text-text-muted">Preparing...</p>
          </div>
        </div>
      }
    >
      <SurahReader />
    </Suspense>
  );
}
