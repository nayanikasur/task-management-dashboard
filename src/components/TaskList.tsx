"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTasks, addTask, updateTask, deleteTask } from "@/redux/tasksSlice";
import TaskCard from "./TaskCard";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { Task } from "@/types/task";
import { useMemo } from "react";

export default function TaskList() {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [statusFilter, setStatusFilter] = useState<
        "All" | "Pending" | "In Progress" | "Completed"
    >("All");
    const [isaztrue, setIsAztrue] = useState(false);

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const didMount = useRef(false);


    const visibleTasks = useMemo(() => {

        let result = [...tasks];

        if (!isaztrue) {
            if (statusFilter !== "All") {
                result = result.filter(task => task.status === statusFilter);
            }




            result.sort((a, b) => {
                const dateA = new Date(a.dueDate).getTime();
                const dateB = new Date(b.dueDate).getTime();

                return sortOrder === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            });
        }

        return result;
    }, [tasks, statusFilter, sortOrder]);

    useEffect(() => {
        const stored = localStorage.getItem("tasks");

        if (stored) {

            dispatch(setTasks(JSON.parse(stored)));
        }
    }, []);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleAdd = (task: Task) => {
        dispatch(addTask(task));
        setIsModalOpen(false);
    };

    const handleEdit = (task: Task) => {
        dispatch(updateTask(task));
        setEditingTask(null);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteTask(id));
    };


    return (
        <>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Tasks</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 md:py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                    + Add Task
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <button className="border p-2 rounded"
                    onClick={() => {
                        setIsAztrue(!isaztrue)
                        const azsortedtitleTasks = [...tasks].sort((a, b) => {
                            if (a.title > b.title) return 1
                            if (a.title < b.title) return -1
                            return 0
                        })

                        dispatch(setTasks(azsortedtitleTasks))

                    }}
                >A-Z</button>

                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as any)}
                    className="border border-gray-300 bg-white px-4 py-2.5 md:py-3 rounded-lg w-full sm:w-48 md:w-52 text-sm md:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400"
                >
                    <option value="All">📋 All Status</option>
                    <option value="Pending">⏳ Pending</option>
                    <option value="In Progress">🔄 In Progress</option>
                    <option value="Completed">✅ Completed</option>
                </select>


                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value as "asc" | "desc")}
                    className="border border-gray-300 bg-white px-4 py-2.5 md:py-3 rounded-lg w-full sm:w-48 md:w-52 text-sm md:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400"
                >
                    <option value="asc">📅 Due Date (Earliest)</option>
                    <option value="desc">📅 Due Date (Latest)</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                {visibleTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => setEditingTask(task)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {visibleTasks.length === 0 && (
                <div className="text-center py-16 md:py-20">
                    <div className="text-6xl md:text-7xl mb-4">📝</div>
                    <p className="text-gray-500 text-base md:text-lg font-medium">No tasks found</p>
                    <p className="text-gray-400 text-sm md:text-base mt-2">Create a new task to get started</p>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TaskForm onSubmit={handleAdd} />
            </Modal>

            <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
                {editingTask && (
                    <TaskForm initialData={editingTask} onSubmit={handleEdit} />
                )}
            </Modal>
        </>
    );
}