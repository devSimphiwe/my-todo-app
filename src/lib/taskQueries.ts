// lib/taskQueries.ts
import db from './db';
import { Task , NewTask } from './types/task';

export interface UpdateTaskData extends Partial<NewTask> {
  id: number;
}

// Fetch ONLY active tasks
export function getActiveTasks(): Task[] {
  const stmt = db.prepare(`
    SELECT * FROM tasks 
    WHERE archived = 0 
    ORDER BY id DESC
  `);
  
  return stmt.all() as Task[];
}

// CREATE TASK
export function createTask(data: NewTask) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, topic, status, dueDate, archived)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    data.title,
    data.description ?? null,
    data.topic ?? 'PERSONAL',
    data.status ?? 'To-do',
    data.dueDate,
    data.archived ? 1 : 0
  );

  return { id: info.lastInsertRowid };
}

//EDIT TASK
export function editTask(data: UpdateTaskData) {
  const stmt = db.prepare(`
    UPDATE tasks 
    SET 
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      topic = COALESCE(?, topic),
      status = COALESCE(?, status),
      dueDate = COALESCE(?, dueDate),
      archived = COALESCE(?, archived)
    WHERE id = ?
  `);

  const info = stmt.run(
    data.title ?? null,
    data.description ?? null,
    data.topic ?? null,
    data.status ?? null,
    data.dueDate ?? null,
    data.archived !== undefined ? (data.archived ? 1 : 0) : null,
    data.id
  );

  return info.changes; // Returns the number of rows updated (1 if success, 0 if ID not found)
}

// UPDATE STATUS
export function updateTaskStatus(id: number, status: Task['status']) {
  const stmt = db.prepare('UPDATE tasks SET status = ? WHERE id = ?');
  const info = stmt.run(status, id);
  return info.changes;
}

// TOGGLE ARCHIVED
export function toggleArchive(id: number) {
  const stmt = db.prepare(`
    UPDATE tasks 
    SET archived = CASE WHEN archived = 1 THEN 0 ELSE 1 END 
    WHERE id = ?
  `);

  const info = stmt.run(id);
  return info.changes; // Returns 1 if successful, 0 if ID wasn't found
}


//FETCH ONLY ARCHIVED
export function fetchArchived(): Task[] {
  const stmt = db.prepare(`
    SELECT * FROM tasks 
    WHERE archived = 1 
    ORDER BY id DESC
  `);

  return stmt.all() as Task[];
}