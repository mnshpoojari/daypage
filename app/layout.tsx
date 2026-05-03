import type { Metadata } from "next";
import { Lora, Annie_Use_Your_Telescope, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const annie = Annie_Use_Your_Telescope({
  variable: "--font-annie",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DayPage",
  description: "A single-screen daily planner that resets every morning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${annie.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
