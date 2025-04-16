"use client";

import Chat from "@/components/chat/Chat";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <main className="flex flex-col gap-8">
        <Chat />
      </main>
    </div>
  );
}
