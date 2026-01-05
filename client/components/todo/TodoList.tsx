"use client";

import { TodoItem } from "./TodoItem";
import { Todo } from "../../hooks/useTodos";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl border-muted bg-muted/20">
        <p className="text-muted-foreground font-medium">No tasks yet.</p>
        <p className="text-sm text-muted-foreground/60">
          Add one above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
