// types/task.ts

export type Status = 'To-do' | 'In-Progress' | 'Completed';

export type Topic = 'WORK' | 'PERSONAL' | 'FINANCE' | 'HEALTH' | 'LEARNING';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  topic: Topic;
  status: Status;
  dueDate: string;      // ISO Date String e.g. "2026-08-15T10:00:00.000Z"
  createdAt: string;    // Auto-generated SQLite timestamp
  archived: number;     // 0 for false, 1 for true
}

// Optional helper type for creating a new task
export type NewTask = {
  title: string;
  dueDate: string;
  description?: string;
  topic?: Topic;
  status?: Status;
  archived?: boolean;
};