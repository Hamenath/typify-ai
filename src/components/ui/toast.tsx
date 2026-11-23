"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          color: "#0f172a",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
          borderRadius: "14px",
          fontWeight: 500,
        },
      }}
      theme="light"
    />
  );
}
