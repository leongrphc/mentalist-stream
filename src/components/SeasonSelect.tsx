"use client";

import { useRouter } from "next/navigation";

export default function SeasonSelect({ value }: { value: number }) {
  const router = useRouter();
  return <label className="season-select">Sezon seç<select value={value} onChange={(event) => router.push(`/sezonlar/${event.target.value}`)}>{Array.from({ length: 7 }, (_, index) => <option value={index + 1} key={index + 1}>{index + 1}. sezon</option>)}</select></label>;
}
