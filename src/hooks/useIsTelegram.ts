import { useEffect, useState } from "react";



export function useTelegram() {
    const [isTelegram, setIsTelegram] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const Tg = (window as any).Telegram?.WebApp;

        if (Tg && window?.location?.href.includes("tgWebApp")) {
            setIsTelegram(true);

            Tg.expand?.();
            Tg.ready?.();

        }
    }, []);

    return isTelegram;
}
