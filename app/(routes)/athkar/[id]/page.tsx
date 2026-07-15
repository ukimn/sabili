"use client";

import ZikrCounter from "@/components/athkar/ZikrCounter";
import { useZekr } from "@/hooks/fetching";
import { useParams } from "next/navigation";

export default function ZekrPage() {
  const params = useParams<{ id: string }>();

  const zerkId = Number(params.id);

  const { data, error, isLoading } = useZekr(zerkId);

  if (isLoading) {
    return <h1 className="text-center">Loading Athkar......</h1>;
  }

  if (error) {
    return <h1 className="text-center">{error.message}</h1>;
  }

  return <ZikrCounter playlist={data?.content} />;
}
