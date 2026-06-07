import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(50, "نام بیش از حد طولانی است"),
    phone: z.string().regex(/^09\d{9}$/, "فرمت شماره موبایل نامعتبر است (مثال: 09121111111)"),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, phone, password } = validation.data;

        const existingUser = await prisma.user.findUnique({
            where: { phone },
            select: { id: true } 
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "این شماره موبایل قبلاً در سیستم ثبت شده است" },
                { status: 409 } 
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                phone,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "حساب کاربری شما با موفقیت ایجاد شد" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: "خطای داخلی سرور رخ داد. لطفاً لحظاتی بعد تلاش کنید." },
            { status: 500 }
        );
    }
}