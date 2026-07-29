import React from 'react';
import './TaskCard.css'

export default function TaskCard() {
  return (
    <div className="flex max-w-md gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-gray-900">
      {/* Icon
      <div className="pt-0.5">
        <span className="text-xl">ⓘ</span>
      </div> */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <h1 className="text-xl font-bold">Title</h1>
        <h2 className="text-sm font-medium text-gray-500">Topic</h2>
        
        <p className="mt-2 text-sm text-gray-600">
          Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
        </p>

        <p className="mt-3 text-xs text-gray-400">Date: Due Date</p>
        <p className="text-xs text-gray-400">Status: Todo</p>

        {/* Buttons Action Area */}
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            Change Status
          </button>
          <button className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-200 transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}