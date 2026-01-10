"use client";


import { useState } from "react";
import { Task, TaskStatus } from "@/types/task";
import { v4 as uuid } from "uuid";


export default function TaskForm({ initialData, onSubmit }: any) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [status, setStatus] = useState<TaskStatus>(initialData?.status || "Pending");
    const [dueDate, setDueDate] = useState(initialData?.dueDate || "");


    const handleSubmit = () => {
        if (!title || !dueDate) return alert("Title and Due Date are required");


        const task: Task = {
            id: initialData?.id || uuid(),
            title,
            description,
            status,
            dueDate,
        };


        onSubmit(task);
    };


    return (
        <div className="space-y-5 md:space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{initialData ? "✏️" : "➕"}</span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {initialData ? "Edit Task" : "Add New Task"}
                </h2>
            </div>


            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    📝 Task Title *
                </label>
                <input
                    className="w-full border-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                    placeholder="Enter task title..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>


            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    📄 Description
                </label>
                <textarea
                    className="w-full border-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 min-h-[100px] resize-none"
                    placeholder="Add details about your task..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>


            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    🎯 Status
                </label>
                <select
                    className="w-full border-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
                    value={status}
                    onChange={e => setStatus(e.target.value as TaskStatus)}
                >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </div>


            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    📅 Due Date *
                </label>
                <input
                    type="date"
                    className="w-full border-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400 cursor-pointer"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                />
            </div>


            <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3.5 md:py-4 rounded-lg font-semibold text-sm md:text-base shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 mt-6"
            >
                {initialData ? "💾 Save Changes" : "➕ Create Task"}
            </button>
        </div>
    );
}