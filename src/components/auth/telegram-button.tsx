import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

type ContactType = {
    phone?: string
    user_id?: number
    first_name?: string
}

export default function TelegramWebApp() {
    const [tg, setTg] = useState<any>(null)
    const [contact, setContact] = useState<ContactType | null>(null)

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://telegram.org/js/telegram-web-app.js"
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            if (window.Telegram?.WebApp) {
                const webApp = window.Telegram.WebApp
                webApp.ready()
                webApp.expand()
                setTg(webApp)
                console.log("Telegram WebApp yuklandi:", webApp)
            }
        }

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [])

    const handlePhoneRequest = () => {
        if (!tg) {
            alert("Telegram WebApp topilmadi")
            return
        }

        console.log("requestContact chaqirildi")

        // ✅ Telegram Mini App API - to'g'ri callback usuli
        tg.requestContact((success: boolean, data?: any) => {
            console.log("Callback natijasi:", { success, data })

            if (success && data) {
                setContact({
                    phone: data.responseUnsafe?.contact?.phone_number,
                    user_id: data.responseUnsafe?.contact?.user_id,
                    first_name: data.responseUnsafe?.contact?.first_name,
                })
                tg.showAlert("Telefon raqam olindi ✅")
            } else {
                tg.showAlert("Telefon raqam yuborilmadi ❌")
            }
        })
    }

    return (
        <div className="w-full px-2 pb-1 space-y-3">
            {contact && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
                    <div>
                        <b>Ism:</b> {contact.first_name || "—"}
                    </div>
                    <div>
                        <b>User ID:</b> {contact.user_id || "—"}
                    </div>
                    <div>
                        <b>Telefon:</b> {contact.phone || "—"}
                    </div>
                </div>
            )}

            <Button
                variant="gradient"
                className="w-full text-white"
                onClick={handlePhoneRequest}
                disabled={!tg}
            >
                {tg ? "Telefon raqam yuborish" : "Yuklanmoqda..."}
            </Button>
        </div>
    )
}