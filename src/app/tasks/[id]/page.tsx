"use client"
import { useHydrateTasks } from "@/hooks/useHydrateTasks";
import { RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react";
import { useSelector } from "react-redux";

const TaskDetailsPage = () => {
    const { id } = useParams();
    useHydrateTasks();

    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const task = tasks.find(t => t.id === id);
    console.log(task, tasks)
    const router = useRouter();

    useEffect(() => {
        if (!task) {
            router.push('/error')
        }
    }, [task])


    return (<>
        <div className="m-2">
            <h1>{task?.title}</h1>
            <p>{task?.description}</p>
        </div></>)
}

export default TaskDetailsPage