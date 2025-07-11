import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

pool
  .connect()
  .then(() => console.log("🚀 Connected to PostgreSQL (auth-service)"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

export default pool;
