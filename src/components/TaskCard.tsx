"use client";

import { useState } from "react";
import TaskForm from "./TaskForm";

export type Status = "To-do" | "In-Progress" | "Completed";

type TaskCardProps = {
  id: number;
  title: string;
  topic: string;
  description: string;
  dueDate: string;
  status: Status | string;
  archived?: boolean | number;
  onStatusChange?: (id: number, newStatus: Status) => void;
  onToggleArchive?: (id: number) => void;
  onTaskUpdated?: () => void;
};

const STATUS_OPTIONS: Status[] = ["To-do", "In-Progress", "Completed"];

// Warning Icon Component
function WarningIconButton({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Warning: Overdue"
      role="img"
    >
      {/* Red circle */}
      <circle cx="16" cy="16" r="15" fill="#E02020" />
      {/* Exclamation stem */}
      <rect x="14.25" y="8" width="3.5" height="11" rx="1.75" fill="white" />
      {/* Exclamation dot */}
      <circle cx="16" cy="23.5" r="2" fill="white" />
    </svg>
  );
}

export default function TaskCard({
  id,
  title,
  topic,
  description,
  dueDate,
  status,
  archived = false,
  onStatusChange,
  onToggleArchive,
  onTaskUpdated,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const isArchived = Boolean(archived);

  // --- OVERDUE CHECK ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDueDate = new Date(dueDate);
  taskDueDate.setHours(0, 0, 0, 0);

  // Check if current date >= due date (and not completed/archived)
  const isOverdue =
    !isNaN(taskDueDate.getTime()) &&
    today.getTime() >= taskDueDate.getTime() &&
    status !== "Completed" &&
    !isArchived;

  const handleStatusSelect = (newStatus: Status) => {
    setIsStatusOpen(false);
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  const handleArchiveToggle = () => {
    setIsStatusOpen(false);
    if (onToggleArchive) {
      onToggleArchive(id);
    }
  };

  return (
    <>
      <div
        className={`relative flex max-w-md w-full gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-gray-900 transition-opacity ${
          isArchived ? "opacity-60 bg-gray-50" : ""
        }`}
      >
        {/* OVERDUE BADGE (Top Right Corner) */}
        {isOverdue && (
          <div className="absolute -top-3 -right-3 z-10" title="Task Overdue">
            <WarningIconButton className="w-8 h-8 drop-shadow-md" />
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between pr-2">
            <h1 className="text-xl font-bold">{title}</h1>
            {/* ARCHIVED BADGE */}
            {isArchived && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                Archived
              </span>
            )}
          </div>

          <h2 className="text-sm font-medium text-gray-500">{topic}</h2>

          <p className="mt-2 text-sm text-gray-600">{description}</p>

          <p
            className={`mt-3 text-xs ${
              isOverdue ? "text-red-600 font-semibold" : "text-gray-400"
            }`}
          >
            Due: {dueDate}
          </p>

          <p className="text-xs text-gray-400">Status: {status}</p>

          <div className="mt-4 flex justify-end gap-2 relative">
            {/* DROPDOWN CONTAINER */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
              >
                Options ▾
              </button>

              {/* DROPDOWN MENU */}
              {isStatusOpen && (
                <div className="absolute right-0 mt-1 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10 py-1 divide-y divide-gray-100">
                  {/* STATUS SELECTION */}
                  <div className="py-1">
                    <span className="block px-4 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      Change Status
                    </span>
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleStatusSelect(opt)}
                        className={`block w-full px-4 py-1.5 text-left text-xs hover:bg-gray-100 ${
                          status === opt
                            ? "font-bold text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* ARCHIVE TOGGLE OPTION */}
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={handleArchiveToggle}
                      className="block w-full px-4 py-1.5 text-left text-xs text-amber-600 hover:bg-amber-50 font-medium"
                    >
                      {isArchived ? "Unarchive Task" : "Archive Task"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* EDIT BUTTON */}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-200"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl relative">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm font-bold"
            >
              ✕
            </button>
            <h2 className="mb-4 text-lg font-bold">Edit Task</h2>

            <TaskForm
              initialData={{
                id,
                title,
                topic,
                description,
                dueDate,
                status,
                archived,
              }}
              onClose={() => setIsEditing(false)}
              onSuccess={() => {
                setIsEditing(false);
                if (onTaskUpdated) onTaskUpdated();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}