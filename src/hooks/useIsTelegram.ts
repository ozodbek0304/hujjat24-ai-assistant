import { useEffect, useState } from "react";


export function useIsTelegram(): boolean {
    const [isTelegram, setIsTelegram] = useState(false);

    useEffect(() => {
        const checkTelegram = () => {
            if (
                typeof window !== "undefined" &&
                window.Telegram &&
                window.Telegram.WebApp
            ) {
                setIsTelegram(true);
            } else {
                setIsTelegram(false);
            }
        };

        checkTelegram();
    }, []);

    return isTelegram;
}
