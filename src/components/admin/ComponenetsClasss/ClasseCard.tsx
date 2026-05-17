"use client";

import {Book, Share2, Users} from "lucide-react"
import {Classe} from "../../../types/classe"
import ClasseCardMenu from "./ClassCardMenu";


interface Props {
    classe: Classe;
    viewMode: "grid" | "list";
    onDelete: (id: string) => void;
    onToggleSuspend: (id: string) => void;
    onShare: (classe: Classe) => void;
}

export default function ClasseCard({
    classe,
    viewMode,
    onDelete,
    onToggleSuspend,
    onShare,
}: Props) {

    const icon = classe.icon ?? null
    const suspendue = classe.suspendue ?? false
    const slogan = classe.slogan ?? null

    if(!classe) return null

    return(
        <div className="rounded-2xl overflow-hidden bg-white/10 shadow-sm border border-gray-100 ${classe.suspendue? opacity-60:''}">
            <div className="relative h-36 bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">{classe.icon || <Book/>}</span>
                <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => onShare(classe)} className="p-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <ClasseCardMenu 
                        suspendue = {classe.suspendue}
                        onDelete={() => onDelete(classe.id)}
                        onToggleSuspend={() => onToggleSuspend(classe.id)}
                    />
                </div>
            </div>
            
            <div className="p-4">
                <h2 className="text-base font-bold text-gray-900">{classe.nom}</h2>
                {classe.slogan &&(
                    <p className="text-sm text-blue-500 italic mb-1">{classe.slogan}</p>
                )}
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{classe.eleves ??0}Students</span>
                </div>
            </div>
        </div>
    )
}