"use client";
import { useRef, useState, useEffect, ReactNode } from "react";

interface SplitPaneProps {
  top: ReactNode;      // 상단 영역 JSX
  bottom: ReactNode;   // 하단 영역 JSX
  initialTopRatio?: number; // 초기 비율 %
  minRatio?: number;   // 상단 최소 %
  maxRatio?: number;   // 상단 최대 %
}

export default function SplitPane({
  top,
  bottom,
  initialTopRatio = 50,
  minRatio = 10,
  maxRatio = 90,
}: SplitPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const [topRatio, setTopRatio] = useState(initialTopRatio);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = "row-resize";
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newRatio = ((e.clientY - rect.top) / rect.height) * 100;

    if (newRatio > minRatio && newRatio < maxRatio) {
      setTopRatio(newRatio);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen flex flex-col">
      {/* 상단 */}
      <div className="overflow-auto" style={{ height: `${topRatio}%` }}>
        {top}
      </div>

      {/* 구분선 */}
      <div
        onMouseDown={handleMouseDown}
        className="h-2 bg-gray-200 hover:bg-gray-400 cursor-row-resize flex items-center justify-center"
      >
        <div className="h-0.5 w-10 bg-gray-500 rounded"></div>
      </div>

      {/* 하단 */}
      <div className="flex-1 overflow-auto" style={{ height: `${100 - topRatio}%` }}>
        {bottom}
      </div>
    </div>
  );
}