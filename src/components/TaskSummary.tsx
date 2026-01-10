"use client";


import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export default function TaskSummary() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const counts = {
        Pending: tasks.filter(t => t.status === "Pending").length,
        "In Progress": tasks.filter(t => t.status === "In Progress").length,
        Completed: tasks.filter(t => t.status === "Completed").length,
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {Object.entries(counts).map(([key, value]) => (
                <div
                    key={key}
                    className="bg-white p-3 sm:p-4 rounded shadow text-center"
                >
                    <p className="text-xs sm:text-sm text-gray-500">{key}</p>
                    <p className="text-xl sm:text-2xl font-bold">{value}</p>
                </div>
            ))}
        </div>
    );
}
