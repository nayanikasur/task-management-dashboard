import { Task } from "@/types/task";




async function getCompletedTasks(): Promise<Task[]> {
    const res = await fetch("http://localhost:3000/api/tasks", {
        cache: "no-store",
    });
    const tasks: Task[] = await res.json();
    return tasks.filter(t => t.status === "Completed");
}




export default async function CompletedTasksPage() {
    const tasks = await getCompletedTasks();




    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Completed Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tasks.map(task => (
                    <div key={task.id} className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}