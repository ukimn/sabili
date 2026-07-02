"use client";
import { surahCardProps } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function SurahCard({
  name,
  englishName,
  englishNameTranslation,
  numberOfAyahs,
  number,
}: surahCardProps) {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-surface-cream transition-colors duration-200 cursor-pointer"
      onClick={() => {
        router.push(`/?number=${number}`);
      }}
    >
      <div className="flex items-center justify-center h-10 w-10 min-w-10 rounded-full bg-slate-100 font-medium text-sm text-text-muted">
        {number}
      </div>

      <div className="flex flex-col gap-0.5 flex-1">
        <h2 className="font-semibold text-base text-text-main">
          {englishName}
        </h2>
        <p className="text-xs text-text-muted font-medium">
          {englishNameTranslation} • {numberOfAyahs} Verses
        </p>
      </div>

      <div className="text-xl font-arabic font-bold text-se-primary text-end">
        {name}
      </div>
    </div>
  );
}
