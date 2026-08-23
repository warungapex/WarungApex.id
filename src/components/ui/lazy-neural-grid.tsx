"use client";

import dynamic from "next/dynamic";

const NeuralGrid = dynamic(() => import("./neural-grid"), { ssr: false });

export function LazyNeuralGrid() {
  return <NeuralGrid />;
}
