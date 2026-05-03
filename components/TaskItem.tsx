"use client";

import type { Task } from "@/lib/types";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
}

export default function TaskItem({ task, onToggle, onTextChange }: Props) {
  const handleToggle = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(task.done ? 4 : 10);
    }
    onToggle(task.id);
  };

  return (
    <div className="flex items-center gap-3 py-2 min-h-[44px]">
      <button
        onClick={handleToggle}
        className={`w-5 h-5 flex-shrink-0 border rounded-sm transition-colors duration-200 flex items-center justify-center active:scale-90 ${
          task.done
            ? "bg-[#4A6741] border-[#4A6741]"
            : "bg-transparent border-[#6B6560] hover:border-[#4A6741]"
        }`}
        style={{ transition: "background-color 200ms, border-color 200ms, transform 100ms" }}
        aria-label={task.done ? "Mark incomplete" : "Mark complete"}
      >
        {task.done && (
          <svg
            key="checked"
            viewBox="0 0 16 16"
            fill="none"
            className="ink-pop w-3 h-3"
            aria-hidden="true"
          >
            <path
              d="M3 8l4 4 6-6"
              stroke="#FAF9F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="relative flex-1">
        <input
          type="text"
          value={task.text}
          onChange={(e) => onTextChange(task.id, e.target.value)}
          placeholder="What must get done today?"
          className={`w-full bg-transparent border-none outline-none text-base transition-colors duration-200 placeholder:text-[#6B6560]/50 ${
            task.done ? "text-[#6B6560]" : "text-[#1A1A1A]"
          }`}
          style={{ fontFamily: "var(--font-annie)" }}
        />
        {task.done && (
          <span
            className="strike-line absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#6B6560] pointer-events-none"
          />
        )}
      </div>
    </div>
  );
}
