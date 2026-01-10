import { NextResponse } from "next/server";
import { Task } from "@/types/task";


let tasks: Task[] = [];


export async function GET() {
    return NextResponse.json(tasks);
}


export async function POST(req: Request) {
    const body = await req.json();
    tasks.push(body);
    return NextResponse.json(body, { status: 201 });
}


export async function PUT(req: Request) {
    const updatedTask = await req.json();
    tasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    return NextResponse.json(updatedTask);
}


export async function DELETE(req: Request) {
    const { id } = await req.json();
    tasks = tasks.filter(t => t.id !== id);
    return NextResponse.json({ success: true });
}