import { type Request, type Response } from 'express';
import { TodoModel } from '../models/todo.model.js';

export class TodoController {
  static async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await TodoModel.getAll();
      res.json(todos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createTodo(req: Request, res: Response) {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    try {
      const insertId = await TodoModel.create(title);
      const newTodo = await TodoModel.getById(insertId);
      res.status(201).json(newTodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { completed, title } = req.body;
    try {
      await TodoModel.update(Number(id), { completed, title });
      const updatedTodo = await TodoModel.getById(Number(id));
      res.json(updatedTodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await TodoModel.delete(Number(id));
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
