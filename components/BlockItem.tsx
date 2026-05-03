"use client";

import type { Block } from "@/lib/types";
import { formatTime } from "@/lib/dates";

interface Props {
  block: Block;
  onDelete: (id: string) => void;
}

export default function BlockItem({ block, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between py-2 min-h-[44px] group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span
          className="text-sm text-[#6B6560] tabular-nums flex-shrink-0"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {formatTime(block.startTime)} – {formatTime(block.endTime)}
        </span>
        <span
          className="text-base text-[#1A1A1A] truncate"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {block.label}
        </span>
      </div>
      <button
        onClick={() => onDelete(block.id)}
        className="text-xs text-[#6B6560] hover:text-[#1A1A1A] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-150 ml-4 flex-shrink-0"
        aria-label={`Remove ${block.label}`}
      >
        remove
      </button>
    </div>
  );
}
