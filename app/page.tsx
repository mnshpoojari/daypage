"use client";

import { useState } from "react";
import { useDayPage } from "@/hooks/useDayPage";
import { formatDisplayDate, getCurrentLocalDate } from "@/lib/dates";
import TaskList from "@/components/TaskList";
import BlockList from "@/components/BlockList";
import NoteArea from "@/components/NoteArea";
import YesterdayPanel from "@/components/YesterdayPanel";
import MorningGreeting from "@/components/MorningGreeting";
import SpiralBinding from "@/components/SpiralBinding";
import RoughCard from "@/components/RoughCard";

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
          className="max-w-[480px] mx-auto overflow-hidden"
          style={{
            backgroundColor: "#FAF9F6",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.09), 0 1px 1px rgba(255,255,255,0.5) inset",
          }}
        >
          {/* Spiral binding at top */}
          <SpiralBinding />

          <div className="px-6 pt-8 pb-10">
            {/* Header */}
            <header className="mb-8">
              <p
                className="text-sm text-[#6B6560] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-annie)" }}
              >
                {dayOfWeek}
              </p>
              <h1
                className="text-3xl text-[#1A1A1A] mt-1"
                style={{ fontFamily: "var(--font-annie)" }}
              >
                {date}
              </h1>
            </header>

            {/* Must Do */}
            <section className="mb-6">
              <p
                className={`text-xs uppercase tracking-widest mb-3 transition-colors duration-300 ${
                  allTasksDone ? "text-[#4A6741]" : "text-[#6B6560]"
                }`}
                style={{ fontFamily: "var(--font-annie)" }}
              >
                {allTasksDone ? "Done for today." : "Must Do"}
              </p>
              <RoughCard>
                <TaskList
                  tasks={tasks}
                  onToggle={toggleTask}
                  onTextChange={updateTaskText}
                />
              </RoughCard>
            </section>

            {/* Time Blocks */}
            <section className="mb-6">
              <p
                className="text-xs uppercase tracking-widest text-[#6B6560] mb-3"
                style={{ fontFamily: "var(--font-annie)" }}
              >
                Time Blocks
              </p>
              <RoughCard>
                <BlockList
                  blocks={blocks}
                  onAdd={addBlock}
                  onDelete={deleteBlock}
                />
              </RoughCard>
            </section>

            {/* One Note */}
            <section className="mb-10">
              <p
                className="text-xs uppercase tracking-widest text-[#6B6560] mb-3"
                style={{ fontFamily: "var(--font-annie)" }}
              >
                One Note
              </p>
              <RoughCard roughness={1.5}>
                <NoteArea note={note} onChange={updateNote} />
              </RoughCard>
            </section>

            {/* Footer */}
            <footer
              className="text-xs text-[#6B6560]/70"
              style={{ fontFamily: "var(--font-annie)" }}
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
        </div>
      </main>
    </>
  );
}
