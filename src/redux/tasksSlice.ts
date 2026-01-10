import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types/task";


interface TasksState {
    tasks: Task[];
}


const initialState: TasksState = {
    tasks: [],
};


const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        updateTask(state, action: PayloadAction<Task>) {
            state.tasks = state.tasks.map(task =>
                task.id === action.payload.id ? action.payload : task
            );
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});


export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;