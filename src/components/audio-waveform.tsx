"use client";

import { useEffect, useRef } from "react";

interface AudioWaveformProps {
  analyserNode: AnalyserNode | null;
  isActive: boolean;
}

export function AudioWaveform({ analyserNode, isActive }: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      if (!isActive || !analyserNode) {
        // Idle gentle waveform in elegant light violet
        ctx.beginPath();
        ctx.strokeStyle = "rgba(147, 51, 234, 0.25)";
        ctx.lineWidth = 2;
        const centerY = height / 2;
        ctx.moveTo(0, centerY);
        for (let x = 0; x < width; x++) {
          const y = centerY + Math.sin(x * 0.04 + Date.now() * 0.002) * 4;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const bufferLength = analyserNode.frequencyBinCount;
      const timeData = new Uint8Array(bufferLength);
      analyserNode.getByteTimeDomainData(timeData);

      // Subtle background ambient wash
      const bgGradient = ctx.createLinearGradient(0, 0, width, 0);
      bgGradient.addColorStop(0, "rgba(124, 58, 237, 0.04)");
      bgGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.05)");
      bgGradient.addColorStop(1, "rgba(6, 182, 212, 0.04)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw active waveform curve
      ctx.lineWidth = 3;
      const strokeGradient = ctx.createLinearGradient(0, 0, width, 0);
      strokeGradient.addColorStop(0, "#7c3aed");
      strokeGradient.addColorStop(0.5, "#2563eb");
      strokeGradient.addColorStop(1, "#0891b2");
      ctx.strokeStyle = strokeGradient;
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = timeData[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw frequency spectrum vertical bars
      const freqData = new Uint8Array(bufferLength);
      analyserNode.getByteFrequencyData(freqData);
      const barCount = 40;
      const barSpacing = 3;
      const totalSpacing = (barCount - 1) * barSpacing;
      const barWidth = Math.max(2, (width - totalSpacing) / barCount);

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * (bufferLength / 2));
        const normalized = freqData[dataIndex] / 255;
        const barHeight = Math.max(4, normalized * (height * 0.7));

        const barGradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        barGradient.addColorStop(0, "rgba(124, 58, 237, 0.7)");
        barGradient.addColorStop(1, "rgba(59, 130, 246, 0.3)");

        ctx.fillStyle = barGradient;
        ctx.beginPath();
        const startX = i * (barWidth + barSpacing);
        const startY = height - barHeight;
        ctx.roundRect ? ctx.roundRect(startX, startY, barWidth, barHeight, [2, 2, 0, 0]) : ctx.rect(startX, startY, barWidth, barHeight);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [analyserNode, isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-24 rounded-xl border border-slate-200/80 bg-white/90 shadow-inner"
      style={{ width: "100%", height: "96px" }}
    />
  );
}
