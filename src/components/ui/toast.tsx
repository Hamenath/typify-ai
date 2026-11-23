"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#1f2937",
          border: "1px solid #374151",
          color: "#e5e7eb",
        },
      }}
      theme="dark"
    />
  );
}
