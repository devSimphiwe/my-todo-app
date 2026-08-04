import { describe, it, expect, beforeEach, vi } from 'vitest';
import Database from 'better-sqlite3';

// 1. Mock the DB module first. Create the SQLite instance INSIDE the factory.
vi.mock('../db', () => {
  const memDb = new Database(':memory:');
  return {
    default: memDb,
  };
});

// 2. Import the mocked default export to use in your beforeEach schema setup
import testDb from '../db';

// 3. Import taskQueries AFTER the mock definition
import {
  getActiveTasks,
  createTask,
  editTask,
  updateTaskStatus,
  toggleArchive,
  fetchArchived,
} from '../taskQueries';

describe('taskQueries', () => {
  beforeEach(() => {
    testDb.exec(`
      DROP TABLE IF EXISTS tasks;
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        topic TEXT DEFAULT 'PERSONAL',
        status TEXT DEFAULT 'To-do',
        dueDate TEXT,
        archived INTEGER DEFAULT 0
      );
    `);
  });

  describe('createTask', () => {
    it('should insert a task with provided and default values', () => {
      const newTask = {
        title: 'Complete unit tests',
        dueDate: '2026-08-10',
      };

      const result = createTask(newTask);

      expect(Number(result.id)).toBe(1);

      const savedTask = testDb.prepare('SELECT * FROM tasks WHERE id = ?').get(1) as any;
      expect(savedTask.title).toBe('Complete unit tests');
      expect(savedTask.description).toBeNull();
      expect(savedTask.topic).toBe('PERSONAL');
      expect(savedTask.status).toBe('To-do');
      expect(savedTask.dueDate).toBe('2026-08-10');
      expect(savedTask.archived).toBe(0);
    });

    it('should respect custom status, topic, and archived flags', () => {
      const result = createTask({
        title: 'Review PR',
        description: 'Check Next.js refactoring',
        topic: 'WORK',
        status: 'In-Progress',
        dueDate: '2026-08-05',
        archived: true,
      });

      const savedTask = testDb.prepare('SELECT * FROM tasks WHERE id = ?').get(Number(result.id)) as any;
      expect(savedTask.topic).toBe('WORK');
      expect(savedTask.status).toBe('In-Progress');
      expect(savedTask.archived).toBe(1);
    });
  });

  describe('getActiveTasks', () => {
    it('should return only non-archived tasks ordered by id descending', () => {
      createTask({ title: 'Task 1', dueDate: '2026-08-01', archived: false });
      createTask({ title: 'Task 2 (Archived)', dueDate: '2026-08-02', archived: true });
      createTask({ title: 'Task 3', dueDate: '2026-08-03', archived: false });

      const active = getActiveTasks();

      expect(active).toHaveLength(2);
      expect(active[0].title).toBe('Task 3');
      expect(active[1].title).toBe('Task 1');
    });
  });

  describe('editTask', () => {
    it('should partially update fields without overwriting existing data with NULL', () => {
      const { id } = createTask({
        title: 'Original Title',
        description: 'Original Description',
        topic: 'WORK',
        dueDate: '2026-08-01',
      });

      const changes = editTask({
        id: Number(id),
        title: 'Updated Title',
      });

      expect(changes).toBe(1);

      const updated = testDb.prepare('SELECT * FROM tasks WHERE id = ?').get(Number(id)) as any;
      expect(updated.title).toBe('Updated Title');
      expect(updated.description).toBe('Original Description');
      expect(updated.topic).toBe('WORK');
    });

    it('should update archived state when specified', () => {
      const { id } = createTask({ title: 'Task to Archive', dueDate: '2026-08-01' });

      editTask({ id: Number(id), archived: true });

      const updated = testDb.prepare('SELECT * FROM tasks WHERE id = ?').get(Number(id)) as any;
      expect(updated.archived).toBe(1);
    });

    it('should return 0 changes when updating non-existent ID', () => {
      const changes = editTask({ id: 999, title: 'Ghost Task' });
      expect(changes).toBe(0);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update task status', () => {
      const { id } = createTask({ title: 'Status Task', dueDate: '2026-08-01' });

      const changes = updateTaskStatus(Number(id), 'Completed');

      expect(changes).toBe(1);

      const updated = testDb.prepare('SELECT * FROM tasks WHERE id = ?').get(Number(id)) as any;
      expect(updated.status).toBe('Completed');
    });
  });

  describe('toggleArchive', () => {
    it('should toggle archived from 0 to 1 and back to 0', () => {
      const { id } = createTask({ title: 'Toggle Test', dueDate: '2026-08-01' });

      toggleArchive(Number(id));
      let task = testDb.prepare('SELECT archived FROM tasks WHERE id = ?').get(Number(id)) as any;
      expect(task.archived).toBe(1);

      toggleArchive(Number(id));
      task = testDb.prepare('SELECT archived FROM tasks WHERE id = ?').get(Number(id)) as any;
      expect(task.archived).toBe(0);
    });

    it('should return 0 changes for non-existent ID', () => {
      const changes = toggleArchive(999);
      expect(changes).toBe(0);
    });
  });

  describe('fetchArchived', () => {
    it('should fetch only archived tasks sorted descending', () => {
      createTask({ title: 'Active', dueDate: '2026-08-01', archived: false });
      createTask({ title: 'Archived 1', dueDate: '2026-08-01', archived: true });
      createTask({ title: 'Archived 2', dueDate: '2026-08-01', archived: true });

      const archived = fetchArchived();

      expect(archived).toHaveLength(2);
      expect(archived[0].title).toBe('Archived 2');
      expect(archived[1].title).toBe('Archived 1');
    });
  });
});