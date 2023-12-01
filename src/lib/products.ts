import prisma from "@/lib/prisma";
export const getProductByCategoryId = async (id: number) => {
  "use server";

  return await prisma.product.findMany({
    where: {
      categoryId: id,
    },
  });
};
export const getProductById = async (id: number) => {
  "use server";

  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};
