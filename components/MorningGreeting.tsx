"use client";

import { useEffect, useState } from "react";

interface Props {
  onDismiss: () => void;
}

export default function MorningGreeting({ onDismiss }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 50);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 500);
    }, 2500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onDismiss]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "#FAF9F6" }}
    >
      <p
        className="text-2xl text-[#1A1A1A] tracking-wide"
        style={{ fontFamily: "var(--font-annie)" }}
      >
        Good morning. New day.
      </p>
    </div>
  );
}
