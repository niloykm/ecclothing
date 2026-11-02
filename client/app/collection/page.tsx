"use client";

import { Suspense } from "react";
import CatalogPage from "@/app/catalog/page";

export default function CollectionPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <CatalogPage />
    </Suspense>
  );
}
