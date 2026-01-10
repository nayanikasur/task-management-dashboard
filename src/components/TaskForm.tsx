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
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">
                {initialData ? "Edit Task" : "Add Task"}
            </h2>


            <input
                className="w-full border p-2 rounded"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />


            <textarea
                className="w-full border p-2 rounded"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />


            <select
                className="w-full border p-2 rounded"
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
            >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>


            <input
                type="date"
                className="w-full border p-2 rounded"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />


            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                Save Task
            </button>
        </div>
    );
}