import { useQuery } from "@tanstack/react-query";
import { fetchAllSurahs, fetchSurah } from "@/services/quran";

export function useSurahs() {
  return useQuery({
    queryKey: ["surahs"],
    queryFn: fetchAllSurahs,
  });
}

export function useSurah(number: string) {
  return useQuery({
    queryKey: ["surah", number],
    queryFn: () => fetchSurah(number),
    enabled: !!number,
  });
}
