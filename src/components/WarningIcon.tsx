export default function WarningIcon() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <svg
        viewBox="0 0 32 32"
        width="48"
        height="48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Warning"
        role="img"
      >
        {/* Red circle */}
        <circle cx="16" cy="16" r="15" fill="#E02020" />
        {/* Exclamation stem */}
        <rect x="14.25" y="8" width="3.5" height="11" rx="1.75" fill="white" />
        {/* Exclamation dot */}
        <circle cx="16" cy="23.5" r="2" fill="white" />
      </svg>
    </div>
  )
}