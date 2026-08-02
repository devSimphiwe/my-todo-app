"use client";

import React, { useState } from "react";
import TaskForm, { TaskFormData } from "./TaskForm"; // Adjust import path if needed

interface FloatingButtonProps {
  onTaskCreated?: () => void;
}

export default function FloatingButton({ onTaskCreated }: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create task");

      // Notify parent page to reload/refresh list
      if (onTaskCreated) {
        onTaskCreated();
      }

      handleClose(); // Close modal on success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Add Task"
        className="
          fixed
          bottom-5
          right-5
          h-20
          w-20
          rounded-full
          bg-cyan-950
          text-white
          text-5xl
          shadow-lg
          hover:bg-cyan-700
          transition-colors
          flex
          items-center
          justify-center
          z-40
        "
      >
        +
      </button>

      {/* Modal Overlay & Form Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          {/* Click outside backdrop to close */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* Form Modal Box */}
          <div className="relative z-10 w-full max-w-md">
            {/* Close 'X' Button in corner */}
            <button
              onClick={handleClose}
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            {/* Task Form Component */}
            <TaskForm onSubmit={handleFormSubmit} onClose={handleClose} />
          </div>
        </div>
      )}
    </>
  );
}