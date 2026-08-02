"use client";

import { useState, useEffect} from "react";
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/Floatingbtn";
import FilterIconButton, { FilterState } from "../components/FilterIconBtn";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showArchived, setShowArchived] = useState(false);

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

  // Toggle archive status for a task
  const handleToggleArchive = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, archived: !t.archived } : t
      )
    );
  };

  async function loadTasks() {
        try {
          // 1. Fetch using relative URL
          const res = await fetch('/api/tasks'); 
          if (!res.ok) throw new Error('Failed to fetch');

          // 2. Parse JSON body
          const data = await res.json(); 
          setTasks(data);
        } catch (err) {
          console.error(err);
        }
      }

  useEffect(() => {
    
      loadTasks();
    }, []);


  // Filter tasks based on archive state + dropdown filters
  const visibleTasks = tasks.filter((task) => {
    // 1. Archive filter
    const matchesArchive = showArchived ? task.archived : !task.archived;
    if (!matchesArchive) return false;

    // 2. Topic filter
    if (filters.topic !== "all" && task.topic !== filters.topic) {
      return false;
    }

    // 3. Status filter
    if (filters.status !== "all" && task.status !== filters.status) {
      return false;
    }

    // 4. Date filter logic
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


  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 p-8">
      {/* ACTION BAR: ARCHIVE BUTTON + FILTER BUTTON NEXT TO IT */}
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
          statuses={["To-Do", "In-Progress", "Completed"]}
          initialFilters={filters}
          onFilterChange={setFilters}
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
          onToggleArchive={handleToggleArchive}
        />
      ))}

      {/* EMPTY STATE MESSAGE */}
      {visibleTasks.length === 0 && (
        <p className="mt-8 text-sm text-gray-400">
          No {showArchived ? "archived" : "active"} tasks match your criteria.
        </p>
      )}

      <FloatingButton onTaskCreated={loadTasks} />
    </main>
  );
}