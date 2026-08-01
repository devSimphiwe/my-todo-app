import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'sqlite.db');

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    topic TEXT NOT NULL DEFAULT 'PERSONAL' 
      CHECK(topic IN ('WORK', 'PERSONAL', 'FINANCE', 'HEALTH', 'LEARNING')),
    status TEXT NOT NULL DEFAULT 'To-do' 
      CHECK(status IN ('To-do', 'In-Progress', 'Completed')),
    dueDate TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    archived INTEGER NOT NULL DEFAULT 0 CHECK(archived IN (0, 1))
  );
`);

export default db;