import prisma from "../../../../prisma/client";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return null;
  } else {
    return user;
  }
};

export const createUser = async (id: string, username: string) => {
  const newUser = await prisma.user.create({
    data: {
      id,
      username,
    },
  });

  return newUser;
};
