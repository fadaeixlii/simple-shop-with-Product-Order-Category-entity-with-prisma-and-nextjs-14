import { createOrder } from "@/lib/orders";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, res: NextResponse) => {
  const body = await request.json();

  await createOrder(body);
  revalidatePath("/orders");
  return NextResponse.json(
    { message: "Operation successful" },
    { status: 200 }
  );
};
