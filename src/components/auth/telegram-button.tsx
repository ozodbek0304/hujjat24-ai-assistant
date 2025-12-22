import { Button } from "@/components/ui/button"
import { TelegramWebAppType } from "@/vite-env"
import { useEffect, useState } from "react"

export default function TelegramWebApp() {
    const [tg, setTg] = useState<TelegramWebAppType | null>(null)

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://telegram.org/js/telegram-web-app.js"
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            if (window.Telegram?.WebApp) {
                const webApp = window.Telegram.WebApp
                webApp.expand()
                setTg(webApp)
            }
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handlePhoneRequest = () => {
        if (!tg) return

        tg.requestContact((result: any) => {
            if (result) {
                tg.showAlert("Telefon raqamingiz muvaffaqiyatli yuborildi!")
            }
        })
    }


    return (
        <div className="fixed bottom-0 left-0 right-0 z-20 w-full px-2 pb-1">

            {JSON.stringify(tg)}
            <Button variant={"gradient"} className="w-full text-white" onClick={handlePhoneRequest}>Telefon raqam yuborish</Button>
        </div>
    )
}
