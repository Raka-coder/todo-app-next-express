"use client";

import { Loader2 } from "lucide-react";
import { useTodos } from "../hooks/useTodos";
import { TodoForm } from "../components/todo/TodoForm";
import { TodoList } from "../components/todo/TodoList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="min-h-screen bg-neutral-50/50 py-12 px-4 md:py-24">
      <main className="max-w-xl mx-auto">
        <Card className="border-none shadow-xl shadow-black/5 bg-white">
          <CardHeader className="text-center pb-8 border-b mb-8">
            <CardTitle className="text-3xl font-bold tracking-tight text-neutral-900">
              Personal Tasks
            </CardTitle>
            <CardDescription className="text-neutral-500 font-medium pt-2">
              Stay organized and focused on your goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add Todo Form */}
            <TodoForm onAdd={addTodo} />

            {/* Loading / Error / List */}
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
              </div>
            ) : error ? (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg text-center text-sm font-medium">
                {error}
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
