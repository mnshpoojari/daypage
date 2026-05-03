"use client";

interface Props {
  note: string;
  onChange: (text: string) => void;
}

export default function NoteArea({ note, onChange }: Props) {
  return (
    <textarea
      value={note}
      onChange={(e) => onChange(e.target.value)}
      placeholder="One thing to hold in mind today..."
      rows={5}
      className="w-full bg-transparent border-none outline-none resize-none text-base text-[#1A1A1A] placeholder:text-[#6B6560]/50"
      style={{
        fontFamily: "var(--font-annie)",
        lineHeight: "1.75rem",
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent calc(1.75rem - 1px), rgba(26,26,26,0.07) calc(1.75rem - 1px), rgba(26,26,26,0.07) 1.75rem)",
        backgroundPosition: "0 6px",
        backgroundAttachment: "local",
      }}
    />
  );
}
