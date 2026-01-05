"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoFormProps {
  onAdd: (title: string) => Promise<void>;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState("");
  const [issubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || issubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(newTodo);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <Input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
        disabled={issubmitting}
      />
      <Button
        type="submit"
        disabled={!newTodo.trim() || issubmitting}
        size="icon"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </form>
  );
}
