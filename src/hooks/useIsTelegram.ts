import { useEffect, useState } from "react";

export function useIsTelegram(): boolean {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const checkTelegram = () => {
      if (typeof window === "undefined") return false;

      const ua = navigator.userAgent || "";

      // 1. Telegram Mobile WebApp
      if (window.Telegram && window.Telegram.WebApp) {
        setIsTelegram(true);
        return;
      }

      // 2. Telegram Desktop (Mac/Windows/Linux)
      if (ua.includes("TelegramDesktop")) {
        setIsTelegram(true);
        return;
      }

      // 3. Qolgan barcha holatlar
      setIsTelegram(false);
    };

    checkTelegram();
  }, []);

  return isTelegram;
}
