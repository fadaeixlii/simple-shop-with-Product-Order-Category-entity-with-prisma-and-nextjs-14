import { createOrder, updateOrderStatuses } from "@/lib/orders";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    await updateOrderStatuses();
    return NextResponse.json(
      { message: "Operation successful" },
      { status: 200 }
    );
  } catch (error) {
    console.dir(error);
  }
}
