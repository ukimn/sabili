"use client";

import SurahCard from "./SurahCard";
import { Input } from "../ui/input";
import { useState } from "react";
import { useSurahs } from "@/hooks/useQuran";
import { motion } from "motion/react";
import { Search, BookOpen } from "lucide-react";

export default function QuranPageSlider() {
  const [search, setSearch] = useState("");
  const { data: surah, isLoading } = useSurahs();

  const filteredSurahs = surah
    ? surah.filter((s) =>
        s.englishName.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <aside className="relative flex h-[calc(100vh-140px)] flex-col overflow-hidden rounded-2xl border border-se-primary/10 bg-white/70 shadow-lg shadow-se-primary/5 backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-se-primary/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-se-accent" />
          <h2 className="text-lg font-bold text-se-primary">Surahs</h2>
        </div>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-text-muted">
          Select a chapter to read
        </p>
      </div>

      {/* Sticky Search */}
      <div className="sticky top-0 z-10 border-b border-se-primary/5 bg-white/80 px-4 py-3 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            placeholder="Search surahs..."
            className="border-se-primary/10 bg-se-primary/[0.02] pl-9 text-sm placeholder:text-text-muted/50 focus:border-se-accent/30 focus:ring-se-accent/10"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-2 py-3 scroll-smooth">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-2 px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center gap-3 rounded-xl px-3 py-3"
              >
                <div className="h-10 w-10 rounded-full bg-se-primary/10" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-28 rounded bg-se-primary/10" />
                  <div className="h-2.5 w-20 rounded bg-se-primary/5" />
                </div>
                <div className="h-4 w-8 rounded bg-se-primary/10" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredSurahs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-2 h-8 w-8 text-text-muted/30" />
            <p className="text-sm text-text-muted">No surahs found</p>
            <p className="text-xs text-text-muted/50">Try a different search</p>
          </div>
        )}

        {/* Surah List */}
        {!isLoading &&
          filteredSurahs.length > 0 && (
            <div>
              {filteredSurahs.map((surahItem, index) => (
                <motion.div
                  key={surahItem.number}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                >
                  <SurahCard
                    name={surahItem.name}
                    englishName={surahItem.englishName}
                    englishNameTranslation={surahItem.englishNameTranslation}
                    numberOfAyahs={surahItem.numberOfAyahs}
                    revelationType={surahItem.revelationType}
                    number={surahItem.number}
                  />
                </motion.div>
              ))}
            </div>
          )}
      </div>

      {/* Footer count */}
      {!isLoading && surah && (
        <div className="border-t border-se-primary/5 px-5 py-2 text-center">
          <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted/50">
            {surah.length} Surahs · {filteredSurahs.length} shown
          </p>
        </div>
      )}
    </aside>
  );
}
