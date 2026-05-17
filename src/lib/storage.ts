import { Classe } from "@/types/classe";

const STORAGE_KEY = "classes";

export function getClasses(): Classe[] {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
    }

    export function saveClasses(classes: Classe[]) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(classes)
    );
}