export type Task = {
  id: string;
  text: string;
  done: boolean;
};

export type Block = {
  id: string;
  startTime: string; // "09:00"
  endTime: string;   // "10:30"
  label: string;
};

export type Yesterday = {
  date: string;
  tasks: Task[];
  blocks: Block[];
  note: string;
};
