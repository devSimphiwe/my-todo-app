type TaskCardProps = {
  title: string;
  topic: string;
  description: string;
  dueDate: string;
  status: string;
};

export default function TaskCard({
  title,
  topic,
  description,
  dueDate,
  status,
}: TaskCardProps) {
  return (
    <div className="flex max-w-md gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-gray-900">
      <div className="flex flex-1 flex-col">
        <h1 className="text-xl font-bold">{title}</h1>
        <h2 className="text-sm font-medium text-gray-500">{topic}</h2>

        <p className="mt-2 text-sm text-gray-600">
          {description}
        </p>

        <p className="mt-3 text-xs text-gray-400">
          Due: {dueDate}
        </p>

        <p className="text-xs text-gray-400">
          Status: {status}
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200">
            Change Status
          </button>

          <button className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-200">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}