"use client";

import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/Floatingbtn";
import FilterIconButton, { FilterState } from "../components/FilterIconBtn";
import SortIconBtn, { SortOrder } from "../components/SortIconBtn"; // <--- Import Sort button

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  // 1. Sort state (defaults to ascending)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    topic: "all",
    status: "all",
    dateFilter: "all",
  });

  // Extract dynamic list of topics from tasks
  const availableTopics = Array.from(
    new Set(tasks.map((task) => task.topic))
  );

  const handleToggleArchive = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, archived: !t.archived } : t
      )
    );
  };

  async function loadTasks(archived = showArchived) {
    try {
      const url = archived ? '/api/archive' : '/api/tasks';
      const res = await fetch(url);
      
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json(); 
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadTasks(showArchived);
  }, [showArchived]);

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // 2. Filter tasks based on archive state + dropdown filters
  const filteredTasks = tasks.filter((task) => {
    const matchesArchive = showArchived ? task.archived : !task.archived;
    if (!matchesArchive) return false;

    if (filters.topic !== "all" && task.topic !== filters.topic) {
      return false;
    }

    if (filters.status !== "all" && task.status !== filters.status) {
      return false;
    }

    if (filters.dateFilter !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);

      if (!isNaN(taskDate.getTime())) {
        if (filters.dateFilter === "overdue" && taskDate >= today) {
          return false;
        }
        if (
          filters.dateFilter === "today" &&
          taskDate.getTime() !== today.getTime()
        ) {
          return false;
        }
        if (filters.dateFilter === "upcoming" && taskDate <= today) {
          return false;
        }
      }
    }

    return true;
  });

  // 3. Sort filtered tasks in-memory without calling API
  const visibleTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();

    // Handle missing/invalid dates by sending them to the end
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 p-8">
      {/* ACTION BAR: ARCHIVE BUTTON + FILTER BUTTON + SORT BUTTON */}
      <div className="flex w-full max-w-md items-center gap-3">
        <button
          type="button"
          onClick={() => setShowArchived((prev) => !prev)}
          className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold transition shadow-sm active:scale-[0.99] ${
            showArchived
              ? "bg-amber-600 text-white hover:bg-amber-700"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          {showArchived ? "Show Active Tasks" : "View Archived Tasks"}
        </button>

        {/* FILTER ICON BUTTON */}
        <FilterIconButton
          topics={availableTopics}
          statuses={["To-do", "In-Progress", "Completed"]}
          initialFilters={filters}
          onFilterChange={setFilters}
        />

        {/* SORT ICON BUTTON */}
        <SortIconBtn
          sortOrder={sortOrder}
          onToggleSort={toggleSortOrder}
        />
      </div>

      {/* VIEW TITLE HEADER */}
      <h2 className="text-xs font-bold tracking-wider text-gray-500 uppercase">
        {showArchived ? "Archived Tasks" : "Active Tasks"}
      </h2>

      {/* RENDER TASKS */}
      {visibleTasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          topic={task.topic}
          description={task.description}
          dueDate={task.dueDate}
          status={task.status}
          archived={task.archived}
          onTaskUpdated={loadTasks}
        />
      ))}

      {/* EMPTY STATE MESSAGE */}
      {visibleTasks.length === 0 && (
        <p className="mt-8 text-sm text-gray-400">
          No {showArchived ? "archived" : "active"} tasks.
        </p>
      )}

      <FloatingButton onTaskCreated={loadTasks} />
    </main>
  );
}