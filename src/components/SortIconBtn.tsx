"use client";

export type SortOrder = "asc" | "desc";

interface SortIconBtnProps {
  sortOrder: SortOrder;
  onToggleSort: () => void;
}

export default function SortIconBtn({ sortOrder, onToggleSort }: SortIconBtnProps) {
  return (
    <button
      type="button"
      onClick={onToggleSort}
      title={`Sort by date (${sortOrder === "asc" ? "Ascending" : "Descending"})`}
      className="flex items-center justify-center p-1 rounded-xl transition hover:opacity-90 active:scale-95 focus:outline-none"
    >
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Sort by date"
        role="img"
      >
        {/* Grey background circle */}
        <circle cx="16" cy="16" r="15" fill="#8A8F98" />

        {/* Up arrow (Left side) - active/highlighted when ASC */}
        <g opacity={sortOrder === "asc" ? "1" : "0.4"}>
          <rect x="11.25" y="11" width="2.5" height="11" rx="1.25" fill="white" />
          <polyline
            points="9,13 12.5,8.5 16,13"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Down arrow (Right side) - active/highlighted when DESC */}
        <g opacity={sortOrder === "desc" ? "1" : "0.4"}>
          <rect x="18.25" y="10" width="2.5" height="11" rx="1.25" fill="white" />
          <polyline
            points="16,19 19.5,23.5 23,19"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </button>
  );
}