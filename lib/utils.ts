import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { quranApiResponse } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


