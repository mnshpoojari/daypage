"use client";

import type { Yesterday } from "@/lib/types";
import { formatDisplayDate, formatTime } from "@/lib/dates";

interface Props {
  yesterday: Yesterday | null;
  onClose: () => void;
}

export default function YesterdayPanel({ yesterday, onClose }: Props) {
  if (!yesterday) {
    return (
      <div className="mt-6 pt-6 border-t border-[#1A1A1A]/10">
        <p
          className="text-sm text-[#6B6560]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Nothing here yet. Come back tomorrow.
        </p>
        <button
          onClick={onClose}
          className="text-xs text-[#4A6741] mt-3 hover:opacity-70 transition-opacity block min-h-[44px]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          close
        </button>
      </div>
    );
  }

  const { dayOfWeek, date } = formatDisplayDate(yesterday.date);
  const filledTasks = yesterday.tasks.filter((t) => t.text.trim() !== "");

  return (
    <div className="mt-6 pt-6 border-t border-[#1A1A1A]/10">
      <p
        className="text-xs uppercase tracking-widest text-[#6B6560] mb-5"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {dayOfWeek}, {date}
      </p>

      {/* Tasks */}
      <div className="mb-5">
        <p
          className="text-xs uppercase tracking-widest text-[#6B6560]/60 mb-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Must Do
        </p>
        {filledTasks.length > 0 ? (
          filledTasks.map((task) => (
            <div
              key={task.id}
              className={`text-sm py-1 ${
                task.done ? "line-through text-[#6B6560]" : "text-[#1A1A1A]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {task.text}
            </div>
          ))
        ) : (
          <p
            className="text-sm text-[#6B6560]/60"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            —
          </p>
        )}
      </div>

      {/* Blocks */}
      {yesterday.blocks.length > 0 && (
        <div className="mb-5">
          <p
            className="text-xs uppercase tracking-widest text-[#6B6560]/60 mb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Time Blocks
          </p>
          {yesterday.blocks.map((block) => (
            <div
              key={block.id}
              className="flex gap-3 text-sm py-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="text-[#6B6560] tabular-nums flex-shrink-0">
                {formatTime(block.startTime)} – {formatTime(block.endTime)}
              </span>
              <span className="text-[#1A1A1A]">{block.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Note */}
      {yesterday.note.trim() !== "" && (
        <div className="mb-5">
          <p
            className="text-xs uppercase tracking-widest text-[#6B6560]/60 mb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            One Note
          </p>
          <p
            className="text-sm text-[#1A1A1A] leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {yesterday.note}
          </p>
        </div>
      )}

      <button
        onClick={onClose}
        className="text-xs text-[#4A6741] hover:opacity-70 transition-opacity min-h-[44px]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        close
      </button>
    </div>
  );
}
