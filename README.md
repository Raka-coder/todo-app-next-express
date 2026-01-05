# Next.js + Express Todo App

A full-stack Todo application built with **Next.js 15** (Frontend), **Express** (Backend), and **MySQL** (Database).

## Features

- ✨ Modern, Dark Mode UI (Tailwind CSS)
- ⚡ Optimistic UI Updates
- 🔒 Strictly Typed Backend (TypeScript)
- 🚀 Backend & Frontend Integration

## Prerequisites

- Node.js (v18+)
- MySQL Server running locally

## Quick Start

### 1. Database Setup

Ensure your MySQL server is running. Create the database and tables:

```bash
# In ./server directory
cd server

# Copy .env.example to .env and update DB credentials if needed
cp .env.example .env

# Run the initialization script
npx tsx init-db.ts
```

### 2. Run the Application

You need to run both the backend and frontend terminals.

**Terminal 1: Backend**

```bash
cd server
npm install
npm run dev
```

_Server runs on `http://localhost:3001`_

**Terminal 2: Frontend**

```bash
cd client
npm install
npm run dev
```

_Frontend runs on `http://localhost:3000`_

## API Documentation

Base URL: `http://localhost:3001/api`

| Method     | Endpoint     | Description   | Request Body                            | Response         |
| :--------- | :----------- | :------------ | :-------------------------------------- | :--------------- |
| **GET**    | `/todos`     | Get all todos | -                                       | `Todo[]`         |
| **POST**   | `/todos`     | Create a todo | `{ "title": "Buy milk" }`               | `Todo` (Created) |
| **PUT**    | `/todos/:id` | Update a todo | `{ "title": "...", "completed": true }` | `Todo` (Updated) |
| **DELETE** | `/todos/:id` | Delete a todo | -                                       | `204 No Content` |

### Data Types

**Todo Object**

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}
```
