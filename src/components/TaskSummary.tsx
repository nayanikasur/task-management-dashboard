"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function TaskSummary() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const router = useRouter();

    const counts = {
        Pending: tasks.filter(t => t.status === "Pending").length,
        "In Progress": tasks.filter(t => t.status === "In Progress").length,
        Completed: tasks.filter(t => t.status === "Completed").length,
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
            {Object.entries(counts).map(([key, value]) => {
                const isCompleted = key === "Completed";

                const cardStyles = {
                    "Pending": "from-amber-50 to-orange-50 border-amber-200",
                    "In Progress": "from-blue-50 to-indigo-50 border-blue-200",
                    "Completed": "from-green-50 to-emerald-50 border-green-200"
                };

                const iconStyles = {
                    "Pending": "⏳",
                    "In Progress": "🔄",
                    "Completed": "✅"
                };

                const textStyles = {
                    "Pending": "text-amber-600",
                    "In Progress": "text-blue-600",
                    "Completed": "text-green-600"
                };

                return (
                    <div
                        key={key}
                        onClick={() => {
                            if (isCompleted) {
                                router.push("/tasks/completed");
                            }
                        }}
                        className={`
              bg-gradient-to-br ${cardStyles[key as keyof typeof cardStyles]}
              p-5 md:p-6 lg:p-7 rounded-xl md:rounded-2xl 
              border-2 shadow-md hover:shadow-xl 
              text-center transform transition-all duration-300 ease-out
              ${isCompleted ? "cursor-pointer hover:scale-105 hover:-translate-y-1 active:scale-100" : "hover:scale-102"}
            `}
                    >
                        <div className="flex flex-col items-center gap-2 md:gap-3">
                            <div className="flex items-center">
                                <span className="text-3xl md:text-4xl">{iconStyles[key as keyof typeof iconStyles]}</span>
                                <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">{key}</p>
                            </div>
                            <p className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textStyles[key as keyof typeof textStyles]}`}>
                                {value}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}