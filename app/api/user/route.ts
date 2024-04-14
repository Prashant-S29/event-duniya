import { NextResponse } from "next/server";

const POST = async (req: Request) => {
  try {
    const body = await req.json();

    return NextResponse.json(body);
  } catch (err) {}
};

export { POST };
