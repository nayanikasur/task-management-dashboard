import Link from "next/link";


export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-[400px] text-center">
        <h1 className="text-2xl font-bold mb-4">Task Management Dashboard</h1>
        <p className="text-gray-600 mb-6">Manage your tasks efficiently</p>
        <Link
          href="/tasks"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}