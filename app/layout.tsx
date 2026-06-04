import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; // ایمپورت فونت فارسی
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

// پیکربندی فونت وزیرمتن برای سایت
const vazirmatn = Vazirmatn({
  subsets: ["arabic"], // پشتیبانی از کاراکترهای فارسی
  variable: "--font-vazirmatn",
  display: "swap",
});

// تنظیمات سئو و اطلاعات سایت برای گوگل
export const metadata: Metadata = {
  title: "اکو فایننس | آموزش و تحلیل بازارهای مالی",
  description: "پلتفرم تخصصی آموزش سرمایه‌گذاری، بررسی اقتصاد کلان و تحلیل بورس",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" // زبان سایت: فارسی
      dir="rtl" // جهت سایت: راست‌چین
      suppressHydrationWarning // جلوگیری از خطای رندر دارک‌مود در سرور
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      {/* در کلاس‌های بادی، رنگ‌های دارک‌مود و لایت‌مود را تنظیم کردیم
        همچنین transition-colors باعث می‌شود تغییر تم با انیمیشن نرم انجام شود
      */}
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}