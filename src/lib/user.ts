import prisma from "@/lib/prisma";
export const getUserById = async (id: number) => {
  "use server";

  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};
