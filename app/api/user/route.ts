import { prisma_db } from "@/lib/prisma_db";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

// Defining Schema for input validation using Zod
const userSchema = z.object({
  userName: z
    .string()
    .min(1, "User Name is required")
    .max(25, "User Name must be less than 25 characters"),
  userEmail: z.string().min(1, "Email is required").email("Invalid Email"),
  userPassword: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(15, "Password must be less than 15 characters"),
});

// POST request
const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userName, userEmail, userPassword } = userSchema.parse(body);

    // check if userEmail already exists
    const existingUserByEmail = await prisma_db.user.findUnique({
      where: { userEmail: userEmail },
    });
    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "Email already exists",
        status: 409,
      });
    }

    // check if userName already exists
    const existingUserByName = await prisma_db.user.findUnique({
      where: { userName: userName },
    });
    if (existingUserByName) {
      return NextResponse.json({
        user: null,
        message: "User Name already exists",
        status: 409,
      });
    }

    // Create a new user
    const hashedUserPassword = await hash(userPassword, 10); // Hasing userPassword
    const newUser = await prisma_db.user.create({
      data: {
        userName,
        userEmail,
        userPassword: hashedUserPassword,
      },
    });

    // Removing userPassword from resposne
    const { userPassword: newUserPassword, ...restUserDetails } = newUser;

    // Sending response
    return NextResponse.json({
      user: restUserDetails,
      message: "User created successfully",
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Something went wrong!!",
      status: 500,
    });
  }
};

const GET = async (request: Request) => {
  try {
    const allData: {
      userId: number;
      userEmail: string;
      userName: string;
      userPassword: string;
      userCreatedAt: Date;
      userUpdatedAt: Date;
    }[] = await prisma_db.user.findMany();
    if (!allData) {
      return NextResponse.json({
        user: null,
        message: "User not found",
        status: 409,
      });
    }
    return NextResponse.json({
      userDetails: allData,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      user: null,
      message: error,
      status: 500,
    });
  }
};

export { POST, GET };
