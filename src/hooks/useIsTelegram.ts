import { useEffect, useState } from "react";

export function useTelegramUser() {
    const [data, setData] = useState<any>({
        loading: true,
        isTelegram: false,
    });

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const tg = window.Telegram?.WebApp;
            const user = tg?.initDataUnsafe?.user;

            if (user?.id) {
                setData({
                    loading: false,
                    isTelegram: true,
                    user_id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    photo_url: user.photo_url,
                });
            } else {
                setData({
                    loading: false,
                    isTelegram: false,
                });
            }
        };
    }, []);

    return data;
}
