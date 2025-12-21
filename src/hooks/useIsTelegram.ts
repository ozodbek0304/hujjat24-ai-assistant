import { useEffect, useState } from "react";

export function useIsTelegram(): boolean {
    const [isTelegram, setIsTelegram] = useState(false);

    useEffect(() => {
        const checkTelegram = () => {
            if (window.Telegram && window.Telegram.WebApp) {
                return true;
            }

            const userAgent = navigator.userAgent || navigator.vendor || (window as any)?.opera;

            const telegramPatterns = [
                /Telegram/i,
                /TelegramBot/i,
                /telegram-bot/i
            ];

            return telegramPatterns.some(pattern => pattern.test(userAgent));
        };

        setIsTelegram(checkTelegram());
    }, []);

    return isTelegram;
}
