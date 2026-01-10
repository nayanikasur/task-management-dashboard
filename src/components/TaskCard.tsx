"use client";

export default function TaskCard({ task, onEdit, onDelete }: any) {
    const statusConfig = {
        "Pending": {
            icon: "⏳",
            bg: "from-amber-50 to-orange-50",
            border: "border-amber-200",
            badge: "bg-amber-100 text-amber-700"
        },
        "In Progress": {
            icon: "🔄",
            bg: "from-blue-50 to-indigo-50",
            border: "border-blue-200",
            badge: "bg-blue-100 text-blue-700"
        },
        "Completed": {
            icon: "✅",
            bg: "from-green-50 to-emerald-50",
            border: "border-green-200",
            badge: "bg-green-100 text-green-700"
        }
    };

    const config = statusConfig[task.status as keyof typeof statusConfig];

    return (
        <div className={`bg-gradient-to-br ${config.bg} p-5 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-xl border-2 ${config.border} transition-all duration-300 hover:scale-105 hover:-translate-y-1 group flex flex-col h-full`}>
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{config.icon}</span>
                    <h3 className="font-bold text-base md:text-lg text-gray-900 leading-tight">{task.title}</h3>
                </div>
            </div>

            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold w-fit ${config.badge} mb-3`}>
                {task.status}
            </span>

            <div className="flex-1 mb-4">
                {task.description && (
                    <p title={task?.description} className="text-sm md:text-base text-gray-700 line-clamp-3">{task.description}</p>
                )}
            </div>

            <div className="mt-auto">
                <div className="flex items-center gap-2 mb-4 pt-3 border-t border-gray-200">
                    <span className="text-sm">📅</span>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                        Due: {task.dueDate}
                    </p>
                </div>

                <div className="flex gap-2 md:gap-3">
                    <button
                        onClick={() => onEdit(task)}
                        className="flex-1 bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2.5 px-4 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm md:text-base active:scale-95 shadow-sm hover:shadow"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="flex-1 bg-white hover:bg-red-50 text-red-600 font-semibold py-2.5 px-4 rounded-lg border-2 border-red-200 hover:border-red-300 transition-all duration-200 text-sm md:text-base active:scale-95 shadow-sm hover:shadow"
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
}