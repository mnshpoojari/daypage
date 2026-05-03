"use client";

import type { Task } from "@/lib/types";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
}

export default function TaskList({ tasks, onToggle, onTextChange }: Props) {
  const allFilled = tasks.every((t) => t.text.trim() !== "");

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onTextChange={onTextChange}
        />
      ))}
      {allFilled && (
        <p
          className="text-xs text-[#6B6560]/60 mt-2 italic"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Three is enough for one day.
        </p>
      )}
    </div>
  );
}
