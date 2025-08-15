import pool from "../database";

export const createOtp = async (
  userId: number,
  otp: string,
  purpose: string,
  expiresAt: Date
): Promise<void> => {
  await pool.query(
    `INSERT INTO otps (user_id, otp, purpose, expires_at) 
     VALUES ($1, $2, $3, $4)`,
    [userId, otp, purpose, expiresAt]
  );
};

export const getOtp = async (userId: number, purpose: string): Promise<any> => {
  const result = await pool.query(
    `SELECT * FROM otps 
     WHERE user_id = $1 AND purpose = $2 
     ORDER BY created_at DESC LIMIT 1`,
    [userId, purpose]
  );
  return result.rows[0] || null;
};

export const deleteOtp = async (
  userId: number,
  purpose: string
): Promise<void> => {
  await pool.query(`DELETE FROM otps WHERE user_id = $1 AND purpose = $2`, [
    userId,
    purpose,
  ]);
};
