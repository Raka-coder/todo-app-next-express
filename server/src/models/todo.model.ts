import mysql from 'mysql2/promise';
import { query } from '../config/db.js';

export interface Todo extends mysql.RowDataPacket {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
}

export class TodoModel {
  static async getAll() {
    return await query<Todo[]>('SELECT * FROM todos ORDER BY created_at DESC');
  }

  static async getById(id: number) {
    const todos = await query<Todo[]>('SELECT * FROM todos WHERE id = ?', [id]);
    return todos[0];
  }

  static async create(title: string) {
    const result = await query<mysql.ResultSetHeader>('INSERT INTO todos (title) VALUES (?)', [title]);
    return result.insertId;
  }

  static async update(id: number, data: { title?: string; completed?: boolean }) {
    if (data.completed !== undefined) {
      await query('UPDATE todos SET completed = ? WHERE id = ?', [data.completed, id]);
    }
    if (data.title !== undefined) {
      await query('UPDATE todos SET title = ? WHERE id = ?', [data.title, id]);
    }
    return true;
  }

  static async delete(id: number) {
    await query<mysql.ResultSetHeader>('DELETE FROM todos WHERE id = ?', [id]);
    return true;
  }
}
