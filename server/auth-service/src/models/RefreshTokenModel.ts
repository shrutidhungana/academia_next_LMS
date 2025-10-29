import prisma from "../database";

export const saveRefreshToken = async (
  userId: number,
  token: string,
  expiresAt: Date
) => {
  await prisma.refreshToken.create({
    data: {
      userId, // use exact schema field
      token,
      expires_at: expiresAt,
    },
  });
};

export const getRefreshToken = async (token: string) => {
  return prisma.refreshToken.findFirst({
    where: { token },
  });
};

export const deleteRefreshToken = async (token: string) => {
  await prisma.refreshToken.deleteMany({
    where: { token },
  });
};
