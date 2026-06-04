import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${vazirmatn.variable} h-full antialiased`}
    >
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