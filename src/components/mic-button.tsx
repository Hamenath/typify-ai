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

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(isActive ? 60 : [40, 30, 40]);
      } catch {
        // Fallback for browsers that restrict vibration
      }
    }
  };

  const handleClick = () => {
    triggerHaptic();
    if (isActive) {
      onStop();
    } else {
      onClick();
    }
  };

  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-24 h-24 sm:w-28 sm:h-28",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10 sm:w-11 sm:h-11",
  };

  return (
    <div className="relative inline-flex items-center justify-center p-2 sm:p-3 touch-manipulation">
      {/* Outer pulsing rings when active */}
      {isActive && (
        <>
          <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute -inset-3 rounded-full bg-rose-500/15 animate-pulse" style={{ animationDuration: "1.5s" }} />
          <div className="absolute -inset-6 rounded-full bg-rose-500/10 animate-pulse" style={{ animationDuration: "2.5s" }} />
        </>
      )}

      {/* Native-feeling touch button */}
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-label={isActive ? "Stop recording" : "Start voice typing"}
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 cursor-pointer active:scale-90 select-none",
          sizeClasses[size],
          isActive
            ? "bg-gradient-to-tr from-rose-600 to-red-500 shadow-xl shadow-rose-500/35 hover:from-rose-700 hover:to-red-600 focus:ring-rose-400/40 scale-105"
            : "bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-600 shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 hover:scale-105 focus:ring-violet-400/40",
          disabled && "opacity-40 cursor-not-allowed hover:scale-100 shadow-none"
        )}
      >
        {isActive ? (
          <Square className={cn(iconSizes[size], "text-white fill-white transition-transform duration-200")} />
        ) : disabled ? (
          <MicOff className={cn(iconSizes[size], "text-white/80")} />
        ) : (
          <Mic className={cn(iconSizes[size], "text-white transition-transform duration-200")} />
        )}
      </button>
    </div>
  );
}
