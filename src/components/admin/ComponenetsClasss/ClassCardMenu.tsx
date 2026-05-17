"use client";

import {
    MoreVertical,
    Pause,
    Play,
    Trash2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

interface Props {
    suspendue?: boolean;
    onDelete: () => void;
    onToggleSuspend: () => void;
    }

    export default function ClasseCardMenu({
    suspendue,
    onDelete,
    onToggleSuspend,
    }: Props) {
    const [open, setOpen] = useState(false);

    const menuRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(
        event: MouseEvent
        ) {
        if (
            menuRef.current &&
            !menuRef.current.contains(
            event.target as Node
            )
        ) {
            setOpen(false);
        }
        }

        document.addEventListener(
        "mousedown",
        handleClickOutside
        );

        return () => {
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
        };
    }, []);

    return (
        <div
        className="relative"
        ref={menuRef}
        >
        <button
            onClick={() => setOpen(!open)}
            className="
            p-2
            rounded-xl
            bg-white/10
            hover:bg-white/20
            "
        >
            <MoreVertical className="w-5 h-5" />
        </button>

        {open && (
            <div
            className="
                absolute
                right-0
                mt-2
                w-48
                rounded-2xl
                border border-white/10
                bg-zinc-900
                overflow-hidden
                z-50
            "
            >
            <button
                onClick={() => {
                onToggleSuspend();
                setOpen(false);
                }}
                className="
                w-full
                flex items-center gap-2
                px-4 py-3
                hover:bg-white/5
                "
            >
                {suspendue ? (
                <>
                    <Play className="w-4 h-4" />
                    Activer
                </>
                ) : (
                <>
                    <Pause className="w-4 h-4" />
                    Suspendre
                </>
                )}
            </button>

            <button
                onClick={() => {
                onDelete();
                setOpen(false);
                }}
                className="
                w-full
                flex items-center gap-2
                px-4 py-3
                text-red-500
                hover:bg-red-500/10
                "
            >
                <Trash2 className="w-4 h-4" />
                Supprimer
            </button>
            </div>
        )}
        </div>
    );
}