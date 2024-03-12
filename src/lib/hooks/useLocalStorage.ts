"use client";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [value, setValue] = useState(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));
        } else {
            return JSON.stringify(initialValue);
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [value, key]);

    return [value, setValue];
}