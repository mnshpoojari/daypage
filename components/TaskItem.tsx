"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/lib/types";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
}

function formatCountdown(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function TaskItem({ task, onToggle, onTextChange }: Props) {
  const [showTimer, setShowTimer] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("25");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  // Countdown tick — re-schedules each second via setTimeout
  useEffect(() => {
    if (!running || secondsLeft === null || secondsLeft <= 0) return;
    const id = setTimeout(() => {
      setSecondsLeft((s) => (s !== null && s > 1 ? s - 1 : 0));
    }, 1000);
    return () => clearTimeout(id);
  }, [running, secondsLeft]);

  // Completion
  useEffect(() => {
    if (secondsLeft === 0 && running) {
      setRunning(false);
      setFinished(true);
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  }, [secondsLeft, running]);

  const handleToggleTask = () => {
    if (running) {
      setRunning(false);
      setSecondsLeft(null);
    }
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(task.done ? 4 : 10);
    }
    onToggle(task.id);
  };

  const handleStart = () => {
    const mins = Math.max(1, parseInt(inputMinutes) || 25);
    setSecondsLeft(mins * 60);
    setRunning(true);
    setFinished(false);
  };

  const handleStop = () => {
    setRunning(false);
    setSecondsLeft(null);
    setFinished(false);
  };

  const handleReset = () => {
    setRunning(false);
    setSecondsLeft(null);
    setFinished(false);
  };

  const showTimerToggle = task.text.trim() !== "" && !task.done;

  return (
    <div>
      <div className="flex items-center gap-3 py-2 min-h-[44px]">
        {/* Checkbox */}
        <button
          onClick={handleToggleTask}
          className={`w-5 h-5 flex-shrink-0 border rounded-sm flex items-center justify-center active:scale-90 ${
            task.done
              ? "bg-[#4A6741] border-[#4A6741]"
              : "bg-transparent border-[#6B6560] hover:border-[#4A6741]"
          }`}
          style={{
            transition:
              "background-color 200ms, border-color 200ms, transform 100ms",
          }}
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

        {/* Text input with animated strikethrough */}
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
            <span className="strike-line absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#6B6560] pointer-events-none" />
          )}
        </div>

        {/* Timer toggle — shows countdown when running, "timer" otherwise */}
        {showTimerToggle && (
          <button
            onClick={() => setShowTimer((v) => !v)}
            className={`text-xs flex-shrink-0 tabular-nums transition-colors min-h-[44px] ${
              running || showTimer
                ? "text-[#4A6741]"
                : "text-[#6B6560]/40 hover:text-[#6B6560]"
            }`}
            style={{
              fontFamily: "var(--font-inter)",
              minWidth: "3.2rem",
              textAlign: "right",
            }}
            aria-label="Toggle timer"
          >
            {running && secondsLeft !== null
              ? formatCountdown(secondsLeft)
              : "timer"}
          </button>
        )}
      </div>

      {/* Timer panel */}
      {showTimer && !task.done && (
        <div className="flex items-center gap-3 pb-3 pl-8">
          {finished ? (
            <>
              <span
                className="text-sm text-[#4A6741]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {"time's up"}
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-[#6B6560] hover:text-[#1A1A1A] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                reset
              </button>
            </>
          ) : running ? (
            <>
              <span
                className="text-base tabular-nums text-[#1A1A1A]"
                style={{ fontFamily: "var(--font-annie)" }}
              >
                {secondsLeft !== null ? formatCountdown(secondsLeft) : ""}
              </span>
              <button
                onClick={handleStop}
                className="text-xs text-[#6B6560] hover:text-[#1A1A1A] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                stop
              </button>
            </>
          ) : (
            <>
              <input
                type="number"
                min="1"
                max="180"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                className="w-10 bg-transparent border-b border-[#6B6560]/40 text-base text-[#1A1A1A] outline-none text-center"
                style={{ fontFamily: "var(--font-annie)" }}
              />
              <span
                className="text-xs text-[#6B6560]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                min
              </span>
              <button
                onClick={handleStart}
                className="text-xs text-[#4A6741] hover:opacity-70 transition-opacity"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                start
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
