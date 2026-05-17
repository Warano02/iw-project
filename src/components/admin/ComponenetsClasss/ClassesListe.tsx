"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link"
import {Plus, Grid3x3, List, BookOpen} from "lucide-react";
import ClasseCardList from "./ClassCardListe";
import {Classe} from "@/types/classe"
import ClassesHeader from "./ClasseHeader";
import ClasseCard from "./ClasseCard";


export default function ClassesList(){
    const [classes, setClasses] = useState<Classe[]>([]);
    const [viewMode,setViewMode] = useState<"grid" | "list">("grid")

    useEffect(()=>{
        const saved = localStorage.getItem("classes");
        if (saved) setClasses(JSON.parse(saved))
    }, []);

    const handleToggleSuspend = (id:string) =>{
        const updated = classes.map((c) =>
        c.id === id? {...c,suspendue: !c.suspendue} : c
    );
    setClasses(updated);
    localStorage.setItem("classes",JSON.stringify(updated))
    }

    const handleDelete = (id:string) => {
        if (!window.confirm('Delete this classe ?'))return;
        const updated = classes.filter((c)=> c.id !== id);
        setClasses(updated);
        localStorage.setItem("classes",JSON.stringify(updated));
    };

    const handleShare = (classe : Classe) => {
        const url = `${window.location.origin}/classe/${classe.id}`;
        if(navigator.share){
            navigator.share({title:classe.nom, url }).catch(() =>{
                navigator.clipboard.writeText(url)
            })
        }else{
            navigator.clipboard.writeText(url);
            alert("Link copied")
        }
    }

    return(
        <div className="min-h-screen ">
            <header>
                <ClassesHeader />
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                {classes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <BookOpen className="w-16 h-16 text-gray-300" />
                        <p className="text-xl font-semibold text-gray-400">Aucune classe</p>
                        <Link href="/teacher/classrooms/create" className=" inline-flex items-center gap-2 px-5 py-3 rounded-xl  bg-pink-500  hover:bg-pink-600 transition-all">
                            <Plus className="w-4 h-4 "/>
                            Create classe
                        </Link>
                    </div>
                ):(
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-gray-500">
                                {classes.length}{classes.length === 1 ?"classe":"calsses"}
                            </p>
                            <div className="flex gap-1 bg-white  rounded-xl p-1">
                                <button onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                    ? ' bg-blue-100 text-blue-600 ' : 'text-gray-400 hover:text-gray-600 '}`}> 
                                    <Grid3x3 className="w-4 h-4 " />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-colors ${
                                        viewMode === "list" ? "bg-blue-100" : "text-gray-400 hover.text-gray-600"
                                    }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {viewMode === "grid"?(
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {classes.map((classe) => (
                                    <ClasseCard key={classe.id} classe={classe}
                                    onDelete={handleDelete} 
                                    onToggleSuspend={handleToggleSuspend} 
                                    onShare={handleShare} />
                                ))}
                            </div>
                        ):(

                            <div className="flex flex-col gap-3">
                                {classes.map((classe) => (
                                    <ClasseCardList 
                                        key={classe.id}
                                        classe={classe}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}