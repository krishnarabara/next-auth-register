import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import User from "../../models/user";
import connect from "../../utils/db";

export const POST = async (request: any) => {
console.log("🚀 ~ file: route.ts:7 ~ POST ~ request:", request)
const { email,password } = await request.json();
console.log("🚀 ~ file: route.ts:8 ~ POST ~ password:", password)
console.log("🚀 ~ file: route.ts:8 ~ POST ~ email:", email)

await connect();

const existingUser = await User.findOne({ email});

if (existingUser) {
return new NextResponse("Email is already in use", { status: 400 });
}

const hashedPassword = await bcrypt.hash(password, 5);
const newUser = new User({
email,
password: hashedPassword,
})

try {
await newUser.save();
return new NextResponse("user is registered", { status: 200 });
} catch (error: any) {
return new NextResponse(error, {
status: 500,
});
}
};

