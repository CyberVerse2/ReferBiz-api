import pg from 'pg'
import { config } from 'dotenv';
config();
const pool = new pg.Pool({
  connectionString: process.env.DBConnLink,
  ssl: {
    rejectUnauthorized: false
  }
});

const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  if (res.rowCount <= 1) return res.rows[0];
  else return res.rows;
};

export { pool, query };
