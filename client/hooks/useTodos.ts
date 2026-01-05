import { useState, useEffect } from "react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

const API_URL = "http://localhost:3001/api/todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError("Could not load todos. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    if (!title.trim()) return;

    // Optimistic update
    const tempId = Date.now();
    const tempTodo = { id: tempId, title, completed: false, created_at: new Date().toISOString() };
    setTodos((prev) => [tempTodo, ...prev]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      const savedTodo = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === tempId ? savedTodo : t)));
    } catch (err) {
      console.error(err);
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
      throw err;
    }
  };

  const toggleTodo = async (id: number, currentStatus: boolean) => {
    // Optimistic update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !currentStatus } : t))
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
    } catch (err) {
      console.error(err);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: currentStatus } : t))
      );
      throw err;
    }
  };

  const deleteTodo = async (id: number) => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete todo");
    } catch (err) {
      console.error(err);
      setTodos(previousTodos);
      throw err;
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos
  };
}
