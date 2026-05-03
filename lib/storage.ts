import type { Task, Block, Yesterday } from "./types";

export const KEYS = {
  TASKS: "daypage_tasks",
  BLOCKS: "daypage_blocks",
  NOTE: "daypage_note",
  DATE: "daypage_date",
  YESTERDAY: "daypage_yesterday",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable or quota exceeded
  }
}

export const getTasks = (): Task[] => safeGet<Task[]>(KEYS.TASKS, []);
export const setTasks = (v: Task[]): void => safeSet(KEYS.TASKS, v);

export const getBlocks = (): Block[] => safeGet<Block[]>(KEYS.BLOCKS, []);
export const setBlocks = (v: Block[]): void => safeSet(KEYS.BLOCKS, v);

export const getNote = (): string => safeGet<string>(KEYS.NOTE, "");
export const setNote = (v: string): void => safeSet(KEYS.NOTE, v);

export const getDate = (): string => safeGet<string>(KEYS.DATE, "");
export const setDate = (v: string): void => safeSet(KEYS.DATE, v);

export const getYesterday = (): Yesterday | null =>
  safeGet<Yesterday | null>(KEYS.YESTERDAY, null);
export const setYesterday = (v: Yesterday): void => safeSet(KEYS.YESTERDAY, v);
