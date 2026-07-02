"use client";
import { useSearchParams } from "next/navigation";

export default function SurahPages() {
  const searchParams = useSearchParams();
  const numberOfSurah = searchParams.get("number");
  return <div>Number: {numberOfSurah}</div>;
}
