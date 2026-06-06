import Link from "next/link";
import { FileText, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      {children}
    </div>
  );
}