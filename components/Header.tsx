"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LogIn, UserCircle, FileText, LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("ADMIN"); 

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
            اکو فایننس
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/" className="hover:text-emerald-500 transition-colors">صفحه اصلی</Link>
            <Link href="/articles" className="hover:text-emerald-500 transition-colors">تحلیل‌ها و مقالات</Link>
            <Link href="/courses" className="hover:text-emerald-500 transition-colors">دوره‌های آموزشی</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {userRole === "ADMIN" && (
                <Link 
                  href="/admin/articles/new" 
                  className="hidden md:flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  نوشتن مقاله
                </Link>
              )}
              
              <button className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <UserCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="hidden sm:block">
                  {userRole === "ADMIN" ? "پنل مدیریت" : "پروفایل من"}
                </span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoggedIn(true)} 
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              ورود / ثبت‌نام
            </button>
          )}
        </div>
        
      </div>
    </header>
  );
}