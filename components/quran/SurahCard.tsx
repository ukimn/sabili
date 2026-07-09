"use client";
import { surahCardProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

export default function SurahCard({
  name,
  englishName,
  englishNameTranslation,
  numberOfAyahs,
  number,
  revelationType,
}: surahCardProps) {
  const router = useRouter();

  return (
    <motion.div
      className="group relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-se-primary/[0.04]"
      onClick={() => router.push(`/?number=${number}`)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Surah Number Badge */}
      <div className="relative flex h-10 w-10 min-w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-se-primary to-se-primary-dark text-sm font-bold text-white shadow-sm">
        <span className="relative z-10 text-[13px]">{number}</span>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="skeleton-shimmer h-full w-full" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-text-main transition-colors duration-200 group-hover:text-se-primary">
            {englishName}
          </h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
              revelationType === "Meccan"
                ? "bg-se-accent/10 text-se-accent-dark"
                : "bg-se-primary/10 text-se-primary"
            }`}
          >
            {revelationType}
          </span>
        </div>
        <p className="text-[11px] text-text-muted">
          {englishNameTranslation} · {numberOfAyahs} verses
        </p>
      </div>

      {/* Arabic Name */}
      <div className="flex items-center gap-1">
        <span className="text-lg font-medium text-se-primary/60 transition-colors duration-200 group-hover:text-se-primary">
          {name}
        </span>
        <ChevronLeft className="h-3.5 w-3.5 text-text-muted/30 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-0.5" />
      </div>
    </motion.div>
  );
}
