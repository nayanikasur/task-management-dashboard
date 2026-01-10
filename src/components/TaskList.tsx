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

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const didMount = useRef(false);


    const visibleTasks = useMemo(() => {
        let result = [...tasks];

        // 🔹 FILTER BY STATUS
        if (statusFilter !== "All") {
            result = result.filter(task => task.status === statusFilter);
        }

        // 🔹 SORT BY DUE DATE
        result.sort((a, b) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();

            return sortOrder === "asc"
                ? dateA - dateB
                : dateB - dateA;
        });

        return result;
    }, [tasks, statusFilter, sortOrder]);

    // 🔹 LOAD FROM LOCAL STORAGE (ON FIRST REAL MOUNT)
    useEffect(() => {
        const stored = localStorage.getItem("tasks");
        console.log(stored)
        if (stored) {
            console.log("ENTERINg")
            dispatch(setTasks(JSON.parse(stored)));
        }
        console.log("HERE")

    }, []);
    console.log(tasks)

    // 🔹 SAVE ONLY AFTER HYDRATION
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return; // skip only initial mount
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

            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">All Tasks</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Task
                </button>
            </div>
            <div className="flex flex-col justify-between sm:flex-row gap-3 mb-4">
                {/* STATUS FILTER */}
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as any)}
                    className="border px-3 py-2 rounded w-full sm:w-40"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                {/* SORT BY DATE */}
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value as "asc" | "desc")}
                    className="border px-3 py-2 rounded w-full sm:w-40"
                >
                    <option value="asc">Due Date ↑</option>
                    <option value="desc">Due Date ↓</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visibleTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => setEditingTask(task)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

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
