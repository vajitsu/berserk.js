"use client";

import Header from "@/ui/Riku/Header";
import "./layout.css";

export default function RikuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}
