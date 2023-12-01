import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(category);
}
