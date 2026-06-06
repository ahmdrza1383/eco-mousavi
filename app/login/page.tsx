"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^09[0-9]{9}$/.test(phone)) return setError("شماره موبایل نامعتبر است");

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "login" }), 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep(2);
    } catch (err: any) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (code.length !== 5) return setError("کد ۵ رقمی را وارد کنید");

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code, action: "login" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/admin"); 
    } catch (err: any) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  const handleLoginWithPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^09[0-9]{9}$/.test(phone)) return setError("شماره موبایل نامعتبر است");
    if (!password) return setError("رمز عبور را وارد کنید");

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/admin");
    } catch (err: any) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8">
        <h1 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">ورود به اکو فایننس</h1>

        {step === 1 && (
          <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1 mb-6">
            <button 
              onClick={() => { setLoginMethod("password"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${loginMethod === "password" ? "bg-white dark:bg-slate-700 shadow text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`}
            >
              با رمز عبور
            </button>
            <button 
              onClick={() => { setLoginMethod("otp"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${loginMethod === "otp" ? "bg-white dark:bg-slate-700 shadow text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`}
            >
              با پیامک یک‌بار مصرف
            </button>
          </div>
        )}

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

        {loginMethod === "password" && step === 1 && (
          <form onSubmit={handleLoginWithPassword} className="space-y-4">
            <input type="tel" dir="ltr" placeholder="شماره موبایل" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-left" />
            <input type="password" dir="ltr" placeholder="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-left" />
            <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white p-3 rounded-lg font-medium mt-2">ورود</button>
          </form>
        )}

        {loginMethod === "otp" && step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <input type="tel" dir="ltr" placeholder="شماره موبایل" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-left" />
            <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white p-3 rounded-lg font-medium mt-2">دریافت پیامک ورود</button>
          </form>
        )}

        {loginMethod === "otp" && step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-5">
            <label className="block text-center text-sm mb-2 text-slate-600">کد ارسال شده را وارد کنید</label>
            <input type="text" dir="ltr" maxLength={5} value={code} onChange={(e) => setCode(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-center text-2xl tracking-widest" />
            <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white p-3 rounded-lg font-medium">ورود به سایت</button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-slate-500 text-sm mt-2">بازگشت و ویرایش شماره</button>
          </form>
        )}

        <div className="text-center mt-6 text-sm text-slate-600">
          حساب کاربری ندارید؟ <Link href="/register" className="text-emerald-600 font-bold hover:underline">ثبت‌نام کنید</Link>
        </div>
      </div>
    </div>
  );
}