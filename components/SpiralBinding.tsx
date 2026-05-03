"use client";

import { useCallback, useEffect, useRef } from "react";

export default function SpiralBinding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const draw = useCallback(async () => {
    const { default: rough } = await import("roughjs");
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const width = container.getBoundingClientRect().width;
    if (width === 0) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", `0 0 ${width} 38`);

    const rc = rough.svg(svg);
    const ringCount = Math.max(Math.floor(width / 32), 1);
    const spacing = width / ringCount;

    for (let i = 0; i < ringCount; i++) {
      const cx = (i + 0.5) * spacing;
      svg.appendChild(
        rc.ellipse(cx, 19, 19, 26, {
          roughness: 1.8,
          strokeWidth: 1.4,
          stroke: "#2C2C2C",
          fill: "#D5CEBD",
          fillStyle: "solid",
        })
      );
    }
  }, []);

  useEffect(() => {
    draw();
    const observer = new ResizeObserver(draw);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [draw]);

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        height="38"
        style={{ width: "100%", display: "block" }}
        aria-hidden="true"
      />
    </div>
  );
}
