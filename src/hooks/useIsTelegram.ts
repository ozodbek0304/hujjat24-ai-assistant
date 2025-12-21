import { useEffect, useState } from "react";

export function useIsTelegram(): boolean {
    const [isTelegram, setIsTelegram] = useState(false);

    useEffect(() => {
        const checkTelegram = () => {
            if (typeof window !== "undefined") {
                const tg = (window as any)?.Telegram?.WebApp;

                if (tg) {
                    setIsTelegram(true);
                    return;
                }

                const ua = navigator.userAgent.toLowerCase();
                if (ua.includes("telegram")) {
                    setIsTelegram(true);
                    return;
                }
            }

            setIsTelegram(false);
        };

        checkTelegram();
    }, []);

    return isTelegram;
}
