import { useQuery } from "@tanstack/react-query";
import { fetchAllSurahs, fetchSurah } from "@/services/quran";
import { getZiker } from "@/services/ziker";

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

export function useZekr(id: number) {
  return useQuery({
    queryKey: ["zekr", id],
    queryFn: () => getZiker(id),
  });
}
