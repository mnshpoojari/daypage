"use client";

import { useRef, useState } from "react";
import type { Block } from "@/lib/types";
import BlockItem from "./BlockItem";

interface Props {
  blocks: Block[];
  onAdd: (block: Omit<Block, "id">) => void;
  onDelete: (id: string) => void;
}

export default function BlockList({ blocks, onAdd, onDelete }: Props) {
  const [adding, setAdding] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [label, setLabel] = useState("");
  const labelRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!label.trim()) {
      labelRef.current?.focus();
      return;
    }
    onAdd({ startTime, endTime, label: label.trim() });
    setStartTime("");
    setEndTime("");
    setLabel("");
    setAdding(false);
  };

  const handleCancel = () => {
    setStartTime("");
    setEndTime("");
    setLabel("");
    setAdding(false);
  };

  return (
    <div>
      {blocks.length === 0 && !adding && (
        <p
          className="text-sm text-[#6B6560]/70 py-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          No blocks yet. Add one.
        </p>
      )}

      {blocks.map((block) => (
        <BlockItem key={block.id} block={block} onDelete={onDelete} />
      ))}

      {adding && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-2">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-transparent border-b border-[#6B6560] text-sm text-[#1A1A1A] outline-none py-1 w-28"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <span
            className="text-sm text-[#6B6560]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            to
          </span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="bg-transparent border-b border-[#6B6560] text-sm text-[#1A1A1A] outline-none py-1 w-28"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <input
            ref={labelRef}
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") handleCancel();
            }}
            className="bg-transparent border-b border-[#6B6560] text-sm text-[#1A1A1A] outline-none py-1 flex-1 min-w-[120px] placeholder:text-[#6B6560]/50"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="text-xs text-[#4A6741] hover:opacity-70 transition-opacity min-h-[44px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              add
            </button>
            <button
              onClick={handleCancel}
              className="text-xs text-[#6B6560] hover:text-[#1A1A1A] transition-colors min-h-[44px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              cancel
            </button>
          </div>
        </div>
      )}

      {blocks.length < 6 && !adding && (
        <button
          onClick={() => setAdding(true)}
          className="text-sm text-[#4A6741] hover:opacity-70 active:scale-95 py-2 min-h-[44px]"
          style={{ fontFamily: "var(--font-inter)", transition: "opacity 150ms, transform 100ms" }}
        >
          + add block
        </button>
      )}
    </div>
  );
}
