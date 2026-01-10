"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "@/redux/tasksSlice";

export function useHydrateTasks() {
    const dispatch = useDispatch();
    const didHydrate = useRef(false);

    useEffect(() => {
        if (didHydrate.current) return;

        const stored = localStorage.getItem("tasks");
        if (stored) {
            dispatch(setTasks(JSON.parse(stored)));
        }

        didHydrate.current = true;
    }, [dispatch]);
}
