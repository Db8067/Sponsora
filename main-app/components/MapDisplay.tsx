"use client";

import dynamic from "next/dynamic";
import React from "react";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-foreground/50">Loading Map...</div>
});

export default function MapDisplay({ address }: { address: string }) {
  return <LeafletMap address={address} />;
}
