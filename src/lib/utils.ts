import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}




export const languageOptions = [
    {
        value: "uz",
        label: "Uzbek",
    },
    {
        value: "ru",
        label: "Russia",
    },
    {
        value: "en",
        label: "English",
    },
]