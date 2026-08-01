"use client";

import { useState, useRef, useEffect } from "react";

// Types for your filter state
export type FilterState = {
  topic: string;
  status: string;
  dateFilter: "all" | "overdue" | "today" | "upcoming";
};

type FilterIconButtonProps = {
  topics?: string[];
  statuses?: string[];
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
};

// 1. Reusable Filter Icon Component
export function FilterIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Filter"
      role="img"
    >
      {/* Grey circle */}
      <circle cx="16" cy="16" r="15" fill="#8A8F98" />
      {/* Funnel top bar */}
      <rect x="8" y="10" width="16" height="2.5" rx="1.25" fill="white" />
      {/* Funnel mid bar */}
      <rect x="11" y="14.75" width="10" height="2.5" rx="1.25" fill="white" />
      {/* Funnel bottom bar */}
      <rect x="14" y="19.5" width="4" height="2.5" rx="1.25" fill="white" />
    </svg>
  );
}

export enum Topic {
  WORK = "WORK",
  PERSONAL = "PERSONAL",
  FINANCE = "FINANCE",
  HEALTH = "HEALTH",
  LEARNING = "LEARNING",
}

// 2. Main Filter Icon Button with Dropdown
export default function FilterIconButton({
  topics = ["WORK", "PERSONAL", "PERSONAL", "LEARNING","HEALTH" ], // Pass your dynamic topics here
  statuses = ["To-do", "In-Progress", "Completed"],
  initialFilters,
  onFilterChange,
}: FilterIconButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      topic: "all",
      status: "all",
      dateFilter: "all",
    }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterSelect = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleReset = () => {
    const resetState: FilterState = {
      topic: "all",
      status: "all",
      dateFilter: "all",
    };
    setFilters(resetState);
    if (onFilterChange) onFilterChange(resetState);
  };

  // Check if any filter is active (not set to 'all')
  const hasActiveFilters =
    filters.topic !== "all" ||
    filters.status !== "all" ||
    filters.dateFilter !== "all";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Filter Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 rounded-full hover:opacity-85 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        aria-label="Open filter options"
      >
        <FilterIcon className="w-9 h-9 drop-shadow-sm" />
        
        {/* Active Filter Indicator Badge */}
        {hasActiveFilters && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl z-50 text-gray-800 text-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Filter Tasks</h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-blue-600 font-medium hover:underline"
              >
                Reset all
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* TOPIC FILTER */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Topic
              </label>
              <select
                value={filters.topic}
                onChange={(e) => handleFilterSelect("topic", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Topics</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* STATUS FILTER */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterSelect("status", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE FILTER */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Due Date
              </label>
              <select
                value={filters.dateFilter}
                onChange={(e) =>
                  handleFilterSelect(
                    "dateFilter",
                    e.target.value as FilterState["dateFilter"]
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Dates</option>
                <option value="overdue">Overdue</option>
                <option value="today">Due Today</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}