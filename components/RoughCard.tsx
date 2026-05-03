"use client";

import { useCallback, useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  roughness?: number;
}

export default function RoughCard({ children, roughness = 1.2 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const draw = useCallback(async () => {
    const { default: rough } = await import("roughjs");
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    svg.appendChild(
      rc.rectangle(4, 4, width - 8, height - 8, {
        roughness,
        strokeWidth: 1.2,
        stroke: "rgba(26,26,26,0.35)",
        fill: "none",
        bowing: 0.8,
      })
    );
  }, [roughness]);

  useEffect(() => {
    draw();
    const observer = new ResizeObserver(draw);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [draw]);

  return (
    <div ref={containerRef} className="relative p-4">
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
