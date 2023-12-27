import User from "@/models/Users";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { email,password } = await request.json();

    await connect();

    try {
    } catch (error: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
    };
}
