import mysql from 'mysql2/promise';
import dotenv from "dotenv"
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function initDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'todo_user',
    password: process.env.DB_PASSWORD || 'todo_password',
    multipleStatements: true, 
  });

  try {
    const schemaSql = fs.readFileSync(path.resolve(__dirname, '../../schema.sql'), 'utf8');
    await connection.query(schemaSql);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await connection.end();
  }
}

initDb();
