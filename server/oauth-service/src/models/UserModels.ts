// src/models/UserModel.ts
import prisma from "../database";

export interface OAuthUserData {
  email?: string;
  name?: string;
  avatarUrl?: string;
  provider: "google" | "github" | "linkedin" | "facebook";
  providerId: string;
}

export const createUser = async (userData: OAuthUserData) => {
  return prisma.user.create({
    data: userData,
  });
};

export const findUserByProviderId = async (providerId: string) => {
  return prisma.user.findUnique({
    where: { providerId },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const upsertOAuthUser = async (userData: OAuthUserData) => {
  return prisma.user.upsert({
    where: { providerId: userData.providerId },
    update: {
      name: userData.name,
      email: userData.email,
      avatarUrl: userData.avatarUrl,
    },
    create: userData,
  });
};
