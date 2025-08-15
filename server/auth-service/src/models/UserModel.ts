import pool from "../database";
import { User } from "../types/user";

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const {
    first_name,
    middle_name,
    last_name,
    username,
    phone,
    email,
    password_hash,
    gender,
    marital_status,
    date_of_birth,
    profile_picture,
    country,
    state,
    city,
    zip,
    address1,
    address2,
    roles,
    organization,
    department,
    job_title,
    how_did_you_hear,
  } = userData;

  const result = await pool.query(
    `INSERT INTO users (
      first_name, middle_name, last_name, username, phone, email, password_hash,
      gender, marital_status, date_of_birth, profile_picture, country, state,
      city, zip, address1, address2, roles, organization, department, job_title,
      how_did_you_hear
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12, $13,
      $14, $15, $16, $17, $18, $19, $20,
      $21
    ) RETURNING *`,
    [
      first_name,
      middle_name,
      last_name,
      username,
      phone,
      email,
      password_hash,
      gender,
      marital_status,
      date_of_birth,
      profile_picture,
      country,
      state,
      city,
      zip,
      address1,
      address2,
      roles,
      organization,
      department,
      job_title,
      how_did_you_hear,
    ]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const verifyUserEmail = async (userId: number): Promise<void> => {
  await pool.query(
    "UPDATE users SET is_email_verified = true, updated_at = NOW() WHERE id = $1",
    [userId]
  );
};
