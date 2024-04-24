import { prisma_db } from "@/lib/prisma_db";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

// Defining Schema for input validation using Zod
const userSchema = z.object({
  name: z
    .string()
    .min(1, "User Name is required")
    .max(25, "User Name must be less than 25 characters"),
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(15, "Password must be less than 15 characters"),
});

// POST request
const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, password } = userSchema.parse(body);

    // check if email already exists
    const existingUserByEmail = await prisma_db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "Email already exists",
        status: 409,
      });
    }

    // // check if name already exists
    // const existingUserByName = await prisma_db.user.findUnique({
    //   where: { name: name },
    // });
    // if (existingUserByName) {
    //   return NextResponse.json({
    //     user: null,
    //     message: "User Name already exists",
    //     status: 409,
    //   });
    // }

    // Create a new user
    const hashedPassword = await hash(password, 10); // Hasing password
    const newUser = await prisma_db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Removing password from resposne
    const { password: newPassword, ...restDetails } = newUser;

    // Sending response
    return NextResponse.json({
      user: restDetails,
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
      id: string;
      name: string | null;
      image: string | null;
      email: string;
    }[] = await prisma_db.user.findMany({
      select: { id: true, name: true, email: true, image: true },
    });
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
