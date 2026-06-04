import Link from "next/link";
import { FileText, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <div className="text-xl font-bold mb-8 text-emerald-500">اکو فایننس</div>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            داشبورد
          </Link>
          <Link href="/admin/articles/new" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
            <FileText className="w-5 h-5" />
            مقاله جدید
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50 dark:bg-slate-950">
        {children}
      </main>
    </div>
  );
}