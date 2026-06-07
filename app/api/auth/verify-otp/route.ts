import { NextResponse } from "next/server";
import redis from "../../../../lib/redis";
import { createSession } from "../../../../lib/jwt";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { phone, code, action, name, nationalId, password } = await request.json();

    const iranianPhoneRegex = /^09[0-9]{9}$/;
    if (!phone || !iranianPhoneRegex.test(phone) || !code) {
      return NextResponse.json({ error: "اطلاعات ارسالی نامعتبر است" }, { status: 400 });
    }

    const cachedCode = await redis.get(phone);

    if (!cachedCode) return NextResponse.json({ error: "کد تایید منقضی شده یا وجود ندارد" }, { status: 400 });
    if (cachedCode !== code) return NextResponse.json({ error: "کد تایید اشتباه است" }, { status: 400 });

    let user;

    if (action === "register") {
      const existingNatId = await prisma.user.findUnique({ where: { nationalId } });
      if (existingNatId) {
        return NextResponse.json({ error: "این کد ملی قبلاً در سیستم ثبت شده است" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await prisma.user.create({
        data: {
          phone,
          name,
          nationalId,
          password: hashedPassword
        },
      });
    } else {
      user = await prisma.user.findUnique({ where: { phone } });
      if (!user) return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    await redis.del(phone);
    await createSession(user.id, user.role);

    return NextResponse.json({ message: "موفقیت‌آمیز بود", role: user.role }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}