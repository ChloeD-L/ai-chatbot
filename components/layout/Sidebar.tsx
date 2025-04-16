"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "General Chat",
      href: "/",
      icon: MessageSquare,
    },
    {
      name: "Care Workflow Assistant",
      href: "/care-workflow",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-4">
        <h1 className="text-xl font-semibold">AI Assistant</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
