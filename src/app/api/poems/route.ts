import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure prisma is properly exported from this path

export async function GET() {
  try {
    const poems = await prisma.poem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(poems);
  } catch (error) {
    console.error("GET /api/poems error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, content, author } = data;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "All fields (title, content, author) are required." },
        { status: 400 }
      );
    }

    const newPoem = await prisma.poem.create({
      data: { title, content, author },
    });

    return NextResponse.json(newPoem, { status: 201 });
  } catch (error) {
    console.error("POST /api/poems error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
