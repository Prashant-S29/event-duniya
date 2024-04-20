import { prisma_db } from "@/lib/prisma_db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

const PUT = async (request: Request, { params }: { params: any }) => {
  try {
    const { email } = params;
    const { newUserPassword } = await request.json();
    // console.log("newUserPassword", newUserPassword);
    // console.log("email", email);
    const hashedUserPassword = await hash(newUserPassword, 10); // Hasing userNewPassword
    const response = await prisma_db.user.update({
      where: { userEmail: email },
      data: {
        userPassword: hashedUserPassword,
      },
    });
    return NextResponse.json({
      message: response,
      status: 500,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
      status: 500,
    });
  }
};

const GET = async (request: Request, { params }: { params: string }) => {
  try {
    const { email }: any = params;

    const userData: any = await prisma_db.user.findUnique({
      where: { userEmail: email },
    });
    if (!userData) {
      return NextResponse.json({
        message: "user not found",
        status: 404,
      });
    }
    return NextResponse.json({
      message: userData,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
      status: 500,
    });
  }
};

export { PUT, GET };
