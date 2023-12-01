import { orderType } from "@/Context/currentOrderContext";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const getOrders = async () => {
  "use server";

  return await prisma.order.findMany();
};

export const createOrder = async (order: orderType) => {
  "use server";

  const product = await prisma.product.findUnique({
    where: {
      id: order?.productId as number,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: order?.userId as number,
    },
  });

  return prisma.order.create({
    data: {
      lat: order.lat ?? 0,
      lng: order.lng ?? 0,
      price: order.price ?? 0,
      status: order.status ?? "PENDING",
      title: `order ${product?.title} by ${user?.name}`,
      productId: (product?.id as number) ?? 1,
      userId: (user?.id as number) ?? 1,
    },
  });
};

export const updateOrderStatuses = async () => {
  "use server";
  const allOrders = await prisma.order.findMany();
  allOrders.forEach(async (order) => {
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status:
          order.status === "PENDING"
            ? "PROCESS"
            : order.status === "PROCESS"
            ? "DELIVERY"
            : order.status === "DELIVERY"
            ? "DELIVERED"
            : "DELIVERED",
      },
    });
  });
  revalidatePath("/orders", "page");
  return {};
};
