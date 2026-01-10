"use client";


import { Task } from "@/types/task";


export default function TaskCard({ task, onEdit, onDelete }: any) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs mt-2">Due: {task.dueDate}</p>
            <div className="flex justify-between mt-4">
                <button onClick={() => onEdit(task)} className="text-blue-600">Edit</button>
                <button onClick={() => onDelete(task.id)} className="text-red-600">Delete</button>
            </div>
        </div>
    );
}