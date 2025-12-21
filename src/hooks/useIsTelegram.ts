import { useEffect, useState } from "react";

export function useIsTelegram() {
    const [isTelegram, setIsTelegram] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const tg = (window as any).Telegram?.WebApp;


        const user_id = tg?.initDataUnsafe?.user?.id;

        if (user_id) {
            setIsTelegram(true);
        } else {
            setIsTelegram(false);
        }
    }, []);

    return isTelegram;
}
