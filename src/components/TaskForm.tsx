import React, { useState } from "react";

// Define the Topic Enum
export enum Topic {
  WORK = "WORK",
  PERSONAL = "PERSONAL",
  FINANCE = "FINANCE",
  HEALTH = "HEALTH",
  LEARNING = "LEARNING",
}

export interface TaskFormData {
  id?: number;
  title: string;
  topic: Topic;
  description: string;
  dueDate: string;
  status?: string;
  archived?: number | boolean;
}

// 1. ADD onClose AND onSuccess TO THE PROPS INTERFACE
interface TaskFormProps {
  initialData?: Partial<TaskFormData> | { topic?: string; [key: string]: any };
  onSubmit?: (data: TaskFormData) => void;
  onClose?: () => void;      // <--- Added here
  onSuccess?: () => void;    // <--- Added here
}

export default function TaskForm({
  initialData,
  onSubmit,
  onClose,
  onSuccess,
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    id: initialData?.id,
    title: initialData?.title || "",
    topic: (initialData?.topic as Topic) || Topic.WORK,
    description: initialData?.description || "",
    dueDate: initialData?.dueDate || "",
    status: initialData?.status || "To-do",
    archived: initialData?.archived,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "topic" ? (value as Topic) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call custom submit handler if provided
    if (onSubmit) {
      await onSubmit(formData);
    }

    // Trigger success callback if provided
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Title Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium text-gray-800">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>

        {/* Topic Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="topic" className="text-sm font-medium text-gray-800">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          >
            {Object.values(Topic).map((topicItem) => (
              <option key={topicItem} value={topicItem}>
                {topicItem.charAt(0) + topicItem.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="dueDate" className="text-sm font-medium text-gray-800">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>

        {/* Description Textarea */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium text-gray-800">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Submit & Optional Cancel Buttons */}
        <div className="flex gap-2 mt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#2a2a2a] py-3 text-sm font-medium text-white transition hover:bg-[#1a1a1a] active:scale-[0.99]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}