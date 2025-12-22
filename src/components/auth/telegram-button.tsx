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
                webApp.expand()
                setTg(webApp)
            }
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handlePhoneRequest = () => {
        if (!tg) {
            alert("Telegram WebApp topilmadi")
            return
        }

        tg.requestContact((result: any) => {
            if (!result) {
                tg.showAlert("Telefon raqam yuborilmadi ❌")
                return
            }

            // ✅ telefonni UI uchun saqlaymiz
            setContact({
                phone: result.phone_number,
                user_id: result.user_id,
                first_name: result.first_name,
            })

            tg.showAlert("Telefon raqam olindi ✅")
        })
    }

    return (
        <div className="w-full px-2 pb-1 space-y-3">
            {contact && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
                    <div>
                        <b>Ism:</b> {contact.first_name}
                    </div>
                    <div>
                        <b>User ID:</b> {contact.user_id}
                    </div>
                    <div>
                        <b>Telefon:</b> {contact.phone}
                    </div>
                </div>
            )}

            <Button
                variant="gradient"
                className="w-full text-white"
                onClick={handlePhoneRequest}
            >
                Telefon raqam yuborish
            </Button>
        </div>
    )
}
