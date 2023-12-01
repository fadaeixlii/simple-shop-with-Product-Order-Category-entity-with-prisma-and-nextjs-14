import { createOrder } from "@/lib/orders";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("object");
    const orders = await prisma.order.findMany({
      where: {
        userId: Number(params.id),
      },
    });
    console.log(orders);
    return NextResponse.json(orders);
  } catch (error) {
    console.dir(error);
  }
}
