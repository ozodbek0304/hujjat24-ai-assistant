import { TelegramUser } from "@/vite-env";
import { useEffect, useState } from "react";


export function useTelegramUser() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const tg = window.Telegram?.WebApp;

            if (!tg) return;


            const user = tg.initDataUnsafe?.user;

            if (user?.id) {
                setData({
                    user_id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    photo_url: user.photo_url,
                });
            }
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return data;
}
