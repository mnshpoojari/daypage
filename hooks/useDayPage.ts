"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Task, Block, Yesterday } from "@/lib/types";
import {
  getTasks,
  getBlocks,
  getNote,
  getDate,
  getYesterday,
  setTasks as persistTasks,
  setBlocks as persistBlocks,
  setNote as persistNote,
  setDate,
  setYesterday as persistYesterday,
} from "@/lib/storage";
import { getCurrentLocalDate } from "@/lib/dates";

function makeDefaultTasks(): Task[] {
  return [
    { id: crypto.randomUUID(), text: "", done: false },
    { id: crypto.randomUUID(), text: "", done: false },
    { id: crypto.randomUUID(), text: "", done: false },
  ];
}

export function useDayPage() {
  const [tasks, setTasksState] = useState<Task[]>([]);
  const [blocks, setBlocksState] = useState<Block[]>([]);
  const [note, setNoteState] = useState<string>("");
  const [yesterday, setYesterdayState] = useState<Yesterday | null>(null);
  const [showMorningGreeting, setShowMorningGreeting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Refs hold current values for the debounced save, avoiding stale closures
  const tasksRef = useRef<Task[]>([]);
  const blocksRef = useRef<Block[]>([]);
  const noteRef = useRef<string>("");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      persistTasks(tasksRef.current);
      persistBlocks(blocksRef.current);
      persistNote(noteRef.current);
    }, 300);
  }, []);

  useEffect(() => {
    const savedDate = getDate();
    const today = getCurrentLocalDate();

    if (savedDate !== today) {
      // Save yesterday snapshot if there was a previous session
      if (savedDate) {
        const snap: Yesterday = {
          date: savedDate,
          tasks: getTasks(),
          blocks: getBlocks(),
          note: getNote(),
        };
        persistYesterday(snap);
        setYesterdayState(snap);
        setShowMorningGreeting(true);
      }

      const freshTasks = makeDefaultTasks();
      persistTasks(freshTasks);
      persistBlocks([]);
      persistNote("");
      setDate(today);

      tasksRef.current = freshTasks;
      blocksRef.current = [];
      noteRef.current = "";

      setTasksState(freshTasks);
      setBlocksState([]);
      setNoteState("");
    } else {
      const t = getTasks();
      const b = getBlocks();
      const n = getNote();

      // Guard: ensure exactly 3 task slots
      const normalised =
        t.length === 3
          ? t
          : makeDefaultTasks().map((def, i) => t[i] ?? def);

      tasksRef.current = normalised;
      blocksRef.current = b;
      noteRef.current = n;

      setTasksState(normalised);
      setBlocksState(b);
      setNoteState(n);
      setYesterdayState(getYesterday());
    }

    setInitialized(true);
  }, []);

  const toggleTask = useCallback(
    (id: string) => {
      setTasksState((prev) => {
        const next = prev.map((t) =>
          t.id === id ? { ...t, done: !t.done } : t
        );
        tasksRef.current = next;
        scheduleSave();
        return next;
      });
    },
    [scheduleSave]
  );

  const updateTaskText = useCallback(
    (id: string, text: string) => {
      setTasksState((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, text } : t));
        tasksRef.current = next;
        scheduleSave();
        return next;
      });
    },
    [scheduleSave]
  );

  const addBlock = useCallback(
    (block: Omit<Block, "id">) => {
      setBlocksState((prev) => {
        if (prev.length >= 6) return prev;
        const next = [...prev, { ...block, id: crypto.randomUUID() }];
        blocksRef.current = next;
        scheduleSave();
        return next;
      });
    },
    [scheduleSave]
  );

  const deleteBlock = useCallback(
    (id: string) => {
      setBlocksState((prev) => {
        const next = prev.filter((b) => b.id !== id);
        blocksRef.current = next;
        scheduleSave();
        return next;
      });
    },
    [scheduleSave]
  );

  const updateNote = useCallback(
    (text: string) => {
      noteRef.current = text;
      setNoteState(text);
      scheduleSave();
    },
    [scheduleSave]
  );

  const dismissMorningGreeting = useCallback(() => {
    setShowMorningGreeting(false);
  }, []);

  return {
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
    allTasksDone:
      tasks.length > 0 &&
      tasks.every((t) => t.done) &&
      tasks.some((t) => t.text.trim() !== ""),
  };
}
