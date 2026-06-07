import { NextResponse } from "next/server";
import redis from "../../../../lib/redis";
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { phone, action } = await request.json();

    const iranianPhoneRegex = /^09[0-9]{9}$/;
    if (!phone || !iranianPhoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "شماره موبایل نامعتبر است (مثال صحیح: 09123456789)" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { phone } });

    if (action === "login" && !existingUser) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد. لطفاً ابتدا ثبت‌نام کنید." },
        { status: 404 }
      );
    }

    if (action === "register" && existingUser) {
      return NextResponse.json(
        { error: "این شماره قبلاً ثبت شده است. لطفاً وارد شوید." },
        { status: 400 }
      );
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();
    await redis.set(phone, code, "EX", 120);

    console.log(`\n========================================`);
    console.log(`SMS MOCK: کد تایید شما برای اکو فایننس: ${code}`);
    console.log(`========================================\n`);

    return NextResponse.json({ message: "کد تایید ارسال شد" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور در ارسال پیامک" }, { status: 500 });
  }
}