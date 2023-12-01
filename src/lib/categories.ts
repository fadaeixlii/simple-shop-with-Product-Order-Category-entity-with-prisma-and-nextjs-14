import prisma from "@/lib/prisma";
export const getCategories = async () => {
  "use server";

  return await prisma.category.findMany();
};

export const getCategoryById = async (id: number) => {
  "use server";

  return await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
};
