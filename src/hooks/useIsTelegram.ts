import { useEffect, useState } from "react"

export function useIsTelegram(): boolean {
    const [isTelegram, setIsTelegram] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return

        const tg = (window as any)?.Telegram?.WebApp
        const userId = tg?.initDataUnsafe?.user?.id

        setIsTelegram(Boolean(userId))
    }, [])

    return isTelegram
}