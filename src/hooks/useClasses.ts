"use client";

import { useEffect, useState } from "react";

import { Classe } from "@/types/classe";
import { defaultClasses } from "@/data/classes";
import {
    getClasses,
    saveClasses,
} from "@/lib/storage";

export function useClasses() {
    const [classes, setClasses] = useState<Classe[]>([]);

    useEffect(() => {
        const storedClasses = getClasses();

        if (storedClasses.length > 0) {
        setClasses(storedClasses);
        } else {
        setClasses(defaultClasses);
        saveClasses(defaultClasses);
        }
    }, []);

    return {
        classes,
        setClasses,
    };
}