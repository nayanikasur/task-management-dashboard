import Link from "next/link";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md md:max-w-lg text-center border border-white/20 hover:shadow-3xl transition-shadow duration-300">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg mb-4">
            <span className="text-3xl sm:text-4xl">✓</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Task Management Dashboard
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2 sm:px-4">
          Manage your tasks efficiently
        </p>

        <Link
          href="/tasks"
          className="inline-block w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}