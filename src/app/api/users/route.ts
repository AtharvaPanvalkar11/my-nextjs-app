import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const user = await prisma.user.create({
    data: { name, email, password },
  });

  return NextResponse.json(user);
}
