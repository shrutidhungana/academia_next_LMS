// src/models/UserModel.ts
import prisma from "../database";
import { User } from "../types/user";

export const createUser = async (userData: any) => {
  return prisma.user.create({
    data: {
      ...userData,
      roles: userData.roles || ["Super-Admin"], // example default
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const verifyUserEmail = async (userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: { is_email_verified: true },
  });
};
