import prisma from "../database";

// CREATE OTP
export const createOtp = async (
  userId: number,
  otp: string,
  purpose: string,
  expiresAt: Date
) => {
  await prisma.otp.create({
    data: { userId, otp, purpose, expires_at: expiresAt },
  });
};

// GET OTP
export const getOtp = async (userId: number, purpose: string) => {
  return await prisma.otp.findFirst({
    where: { userId, purpose },
    orderBy: { created_at: "desc" },
  });
};

// DELETE OTP
export const deleteOtp = async (userId: number, purpose: string) => {
  await prisma.otp.deleteMany({
    where: { userId, purpose },
  });
};
