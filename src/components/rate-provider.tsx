"use client";

import { createContext, useContext } from "react";

const RateContext = createContext<number>(0);

export function RateProvider({ rate, children }: { rate: number; children: React.ReactNode }) {
  return <RateContext.Provider value={rate}>{children}</RateContext.Provider>;
}

export function useUsdIdrRate() {
  return useContext(RateContext);
}