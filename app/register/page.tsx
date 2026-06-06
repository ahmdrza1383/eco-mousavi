"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "", phone: "", nationalId: "", password: "", code: ""
  });

  const validateNationalId = (id: string) => {
    if (!/^\d{10}$/.test(id)) return false;
    const check = parseInt(id[9]);
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(id[i]) * (10 - i);
    sum = sum % 11;
    return (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);
  };

  const isPasswordStrong = (pass: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name) return setError("لطفاً نام خود را وارد کنید");
    if (!/^09[0-9]{9}$/.test(formData.phone)) return setError("شماره موبایل نامعتبر است");
    if (!validateNationalId(formData.nationalId)) return setError("کد ملی وارد شده معتبر نیست");
    if (!isPasswordStrong(formData.password)) {
      return setError("رمز عبور باید حداقل ۸ کاراکتر و ترکیبی از حروف انگلیسی و اعداد باشد");
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, action: "register" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.code.length !== 5) return setError("کد تایید باید ۵ رقم باشد");

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, action: "register" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8">
        <h1 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">ثبت‌نام در اکو فایننس</h1>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <input type="text" placeholder="نام و نام خانوادگی" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <input type="tel" dir="ltr" placeholder="شماره موبایل (09...)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-left" />
            </div>
            <div>
              <input type="text" dir="ltr" maxLength={10} placeholder="کد ملی" value={formData.nationalId} onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-left" />
            </div>
            <div>
              <input type="password" dir="ltr" placeholder="رمز عبور (انگلیسی و عدد)" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-left" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white p-3 rounded-lg font-medium mt-2">دریافت کد تایید</button>
            <div className="text-center mt-4 text-sm text-slate-600">
              قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login" className="text-emerald-600 font-bold hover:underline">وارد شوید</Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-5">
            <div>
              <label className="block text-center text-sm mb-2 text-slate-600">کد تایید پیامک شده را وارد کنید</label>
              <input type="text" dir="ltr" maxLength={5} value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent text-center text-2xl tracking-widest" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white p-3 rounded-lg font-medium">تکمیل ثبت‌نام</button>
          </form>
        )}
      </div>
    </div>
  );
}