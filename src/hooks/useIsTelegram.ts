import { useEffect, useState } from "react";

export function useIsTelegram(): boolean {
    const [isTelegram, setIsTelegram] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();

        if ((window as any)?.Telegram?.WebApp) {
            setIsTelegram(true);
            return;
        }

        if (ua.includes("telegram")) {
            setIsTelegram(true);
            return;
        }

        setIsTelegram(false);
    }, []);

    return isTelegram;
}
