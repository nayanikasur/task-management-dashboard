import TaskSummary from "@/components/TaskSummary";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
    return (
        <div className="p-6 bg-white">
            <TaskSummary />
            <TaskList />
        </div>
    );
}
