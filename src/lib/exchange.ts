import { EXCHANGE_RATE } from "./accounts";

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
let cached: { rate: number; at: number } | null = null;

export async function getUsdIdrRate(): Promise<number> {
  if (cached && Date.now() - cached.at < CACHE_TTL) return cached.rate;
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return cached?.rate ?? EXCHANGE_RATE;
    const data = await res.json();
    const rate = data?.rates?.IDR;
    if (typeof rate === "number" && rate > 0) {
      cached = { rate, at: Date.now() };
      return rate;
    }
    return cached?.rate ?? EXCHANGE_RATE;
  } catch {
    return cached?.rate ?? EXCHANGE_RATE;
  }
}
