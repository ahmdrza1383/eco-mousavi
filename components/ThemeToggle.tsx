"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; 
  }

  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
      aria-label="تغییر تم"
    >
      {currentTheme === "dark" ? (
        <Sun className="w-5 h-5" /> 
      ) : (
        <Moon className="w-5 h-5" /> 
      )}
    </button>
  );
}