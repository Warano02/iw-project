import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

export default function ClassesHeader() {
    return (
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/10">
                <BookOpen className="w-7 h-7 text-white" />
            </div>

            <div>
                <h1 className="text-3xl font-bold text-white">
                    My Classes
                </h1>

                <p className="text-zinc-400">
                Create and manage your classes
                </p>
            </div>
        </div>

        <Link
            href="/teacher/classrooms/create"
            className="
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-white/10
                hover:bg-white/40
                transition-all
            "
            >
            <Plus className="w-5 h-5" />

            Create classe
            </Link> 
        </div>
        </header>
    );
}