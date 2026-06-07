import { NextResponse } from "next/server";
import { createSession } from "../../../../lib/jwt";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma"


export async function POST(request: Request) {
    try {
        const { phone, password } = await request.json();

        if (!phone || !password) {
            return NextResponse.json({ error: "لطفاً موبایل و رمز عبور را وارد کنید" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { phone },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { error: "کاربری با این مشخصات یافت نشد یا رمز عبور تنظیم نشده است" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
        }

        await createSession(user.id, user.role);

        return NextResponse.json({ message: "ورود موفقیت‌آمیز بود", role: user.role }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
    }
}