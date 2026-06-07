import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Header from "../components/Header";

const vazirmatn = localFont({
  src: "../public/fonts/VazirmatnVariable.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "اکو فایننس | آموزش و تحلیل بازارهای مالی",
  description: "پلتفرم تخصصی آموزش سرمایه‌گذاری، بررسی اقتصاد کلان و تحلیل بورس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}