"use client";

import { cn } from "@/lib/utils";
import { Mic, MicOff, Square } from "lucide-react";

interface MicButtonProps {
  isRecording: boolean;
  isListening: boolean;
  onClick: () => void;
  onStop: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function MicButton({
  isRecording,
  isListening,
  onClick,
  onStop,
  disabled = false,
  size = "lg",
}: MicButtonProps) {
  const isActive = isRecording || isListening;

  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Pulse rings */}
      {isActive && (
        <>
          <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute -inset-3 rounded-full bg-violet-500/10 animate-pulse" style={{ animationDuration: "1.5s" }} />
          <div className="absolute -inset-6 rounded-full bg-violet-500/5 animate-pulse" style={{ animationDuration: "2.5s" }} />
        </>
      )}

      {/* Main button */}
      <button
        onClick={isActive ? onStop : onClick}
        disabled={disabled}
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-violet-500/30",
          sizeClasses[size],
          isActive
            ? "bg-gradient-to-br from-red-500 to-red-700 shadow-2xl shadow-red-500/30 hover:from-red-600 hover:to-red-800 scale-105"
            : "bg-gradient-to-br from-violet-600 to-blue-600 shadow-2xl shadow-violet-500/30 hover:from-violet-500 hover:to-blue-500 hover:scale-105",
          disabled && "opacity-50 cursor-not-allowed hover:scale-100"
        )}
      >
        {isActive ? (
          <Square className={cn(iconSizes[size], "text-white fill-white")} />
        ) : disabled ? (
          <MicOff className={cn(iconSizes[size], "text-white/70")} />
        ) : (
          <Mic className={cn(iconSizes[size], "text-white")} />
        )}
      </button>
    </div>
  );
}
