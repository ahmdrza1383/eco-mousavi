import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, password } = body;

        if (!name || !phone || !password) {
            return NextResponse.json(
                { error: "لطفاً تمام فیلدها را پر کنید" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { phone },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "این شماره موبایل قبلاً ثبت شده است" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                phone,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "ثبت‌نام با موفقیت انجام شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "خطایی در ارتباط با سرور رخ داد" },
            { status: 500 }
        );
    }
}