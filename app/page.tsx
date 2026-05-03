"use client";

import { useState } from "react";
import { useDayPage } from "@/hooks/useDayPage";
import { formatDisplayDate, getCurrentLocalDate } from "@/lib/dates";
import TaskList from "@/components/TaskList";
import BlockList from "@/components/BlockList";
import NoteArea from "@/components/NoteArea";
import YesterdayPanel from "@/components/YesterdayPanel";
import MorningGreeting from "@/components/MorningGreeting";

export default function DayPage() {
  const {
    tasks,
    blocks,
    note,
    yesterday,
    showMorningGreeting,
    dismissMorningGreeting,
    initialized,
    toggleTask,
    updateTaskText,
    addBlock,
    deleteBlock,
    updateNote,
    allTasksDone,
  } = useDayPage();

  const [showYesterday, setShowYesterday] = useState(false);

  const today = getCurrentLocalDate();
  const { dayOfWeek, date } = formatDisplayDate(today);

  if (!initialized) {
    return <div style={{ backgroundColor: "#E8E3D9", minHeight: "100vh" }} />;
  }

  return (
    <>
      {showMorningGreeting && (
        <MorningGreeting onDismiss={dismissMorningGreeting} />
      )}

      <main
        className="min-h-screen px-3 py-10"
        style={{ backgroundColor: "#E8E3D9" }}
      >
        <div
          className="max-w-[480px] mx-auto px-6 py-10"
          style={{
            backgroundColor: "#FAF9F6",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.07), 0 1px 1px rgba(255,255,255,0.5) inset",
          }}
        >
          {/* Header */}
          <header className="mb-10">
            <p
              className="text-sm text-[#6B6560] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {dayOfWeek}
            </p>
            <h1
              className="text-3xl text-[#1A1A1A] mt-1"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {date}
            </h1>
          </header>

          {/* Must Do */}
          <section className="mb-8">
            <p
              className={`text-xs uppercase tracking-widest mb-3 transition-colors duration-300 ${
                allTasksDone ? "text-[#4A6741]" : "text-[#6B6560]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {allTasksDone ? "Done for today." : "Must Do"}
            </p>
            <hr className="border-[#1A1A1A]/10 mb-4" />
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onTextChange={updateTaskText}
            />
          </section>

          {/* Time Blocks */}
          <section className="mb-8">
            <p
              className="text-xs uppercase tracking-widest text-[#6B6560] mb-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Time Blocks
            </p>
            <hr className="border-[#1A1A1A]/10 mb-4" />
            <BlockList
              blocks={blocks}
              onAdd={addBlock}
              onDelete={deleteBlock}
            />
          </section>

          {/* One Note */}
          <section className="mb-12">
            <p
              className="text-xs uppercase tracking-widest text-[#6B6560] mb-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              One Note
            </p>
            <hr className="border-[#1A1A1A]/10 mb-4" />
            <NoteArea note={note} onChange={updateNote} />
          </section>

          {/* Footer */}
          <footer
            className="text-xs text-[#6B6560]/70"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Resets at midnight</span>
            <span className="mx-2">·</span>
            <button
              onClick={() => setShowYesterday((v) => !v)}
              className="hover:text-[#4A6741] transition-colors"
            >
              yesterday
            </button>
            {/* PREMIUM: this week */}
            {/* <span className="mx-2">·</span>
            <span className="opacity-40 cursor-not-allowed">this week</span> */}
          </footer>

          {/* Yesterday Panel */}
          {showYesterday && (
            <YesterdayPanel
              yesterday={yesterday}
              onClose={() => setShowYesterday(false)}
            />
          )}

          {/* PREMIUM: Friday weekly summary email prompt */}
          {/* {new Date().getDay() === 5 && (
            <div className="mt-8 pt-4 border-t border-[#1A1A1A]/10">
              <p className="text-xs text-[#6B6560]/50">
                Want a weekly recap? Enter your email.
              </p>
            </div>
          )} */}
        </div>
      </main>
    </>
  );
}
