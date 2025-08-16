import pool from "../database";

export const saveRefreshToken = async (
  userId: number,
  token: string,
  expiresAt: Date
): Promise<void> => {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at) 
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  );
};

export const getRefreshToken = async (token: string) => {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1`,
    [token]
  );
  return result.rows[0] || null;
};

export const deleteRefreshToken = async (token: string): Promise<void> => {
  await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [token]);
};
