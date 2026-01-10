"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useHydrateTasks } from "@/hooks/useHydrateTasks";

export default function CompletedTasks() {
    useHydrateTasks();

    const completedTasks = useSelector((state: RootState) =>
        state.tasks.tasks.filter(task => task.status === "Completed")
    );

    if (completedTasks.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">✅ Completed Tasks</h1>
                    <div className="text-center py-16 md:py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <div className="text-6xl md:text-7xl mb-4">🎉</div>
                        <p className="text-gray-500 text-base md:text-lg font-medium">No completed tasks yet.</p>
                        <p className="text-gray-400 text-sm md:text-base mt-2">Complete your first task to see it here!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
                <div className="mb-8 md:mb-10">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">✅ Completed Tasks</h1>
                    <p className="text-sm md:text-base text-gray-600">You've completed {completedTasks.length} {completedTasks.length === 1 ? 'task' : 'tasks'}. Great job! 🎊</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                    {completedTasks.map(task => (
                        <div key={task.id} className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-xl border-2 border-green-100 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">✅</span>
                                <h3 className="font-bold text-base md:text-lg text-gray-900 leading-tight flex-1">{task.title}</h3>
                            </div>
                            {task.description && (
                                <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">{task.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                                <span className="text-xs md:text-sm">📅</span>
                                <p className="text-xs md:text-sm text-gray-500 font-medium">
                                    {task.dueDate}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}