"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition-all flex items-center justify-center"
      aria-label="تغییر تم"
    >
      <Sun className="h-5 w-5 text-amber-500 hidden dark:block" />
      <Moon className="h-5 w-5 text-slate-700 block dark:hidden" />
    </button>
  );
}