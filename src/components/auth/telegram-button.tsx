import { Button } from "@/components/ui/button"
import {
    LOGIN_TELEGRAM,
    LOGIN_TELEGRAM_REGISTER,
} from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"
import { useAuthStore } from "@/store/auth-store"
import { Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function TelegramWebApp() {
    const { setToken } = useAuthStore()
    const [tg, setTg] = useState<any>(null)
    const [showPhoneButton, setShowPhoneButton] = useState(false)

    const { mutate: loginMutate } = usePost()
    const { mutate: registerMutate } = usePost()

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

                const user = webApp.initDataUnsafe?.user
                if (user?.id) {
                    autoLogin(user)
                }
            }
        }

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [])

    const autoLogin = (user: any) => {
        const payload = {
            chat_id: user.id,
            first_name: user.first_name,
        }

        loginMutate(
            LOGIN_TELEGRAM,
            payload,

            {
                onSuccess: (res: any) => {
                    if (res?.access_token) {
                        if (res?.access_token) {
                            setToken(res?.access_token)
                        }
                    } else {
                        setShowPhoneButton(true)
                    }
                },
            },
        )
    }

    const handlePhoneRequest = () => {
        if (!tg) return

        tg.requestContact((success: boolean, data?: any) => {
            if (!success) {
                toast.error("Telefon yuborilmadi ❌")
                return
            }
            const payload = {
                phone: data.responseUnsafe?.contact?.phone_number,
                chat_id: data.responseUnsafe?.contact?.user_id,
                first_name: data.responseUnsafe?.contact?.first_name,
            }

            registerMutate(
                LOGIN_TELEGRAM_REGISTER,
                payload,

                {
                    onSuccess: (res: any) => {
                        if (res?.access_token) {
                            setToken(res?.access_token)
                        }
                        setShowPhoneButton(false)
                        toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz ✅")
                    },
                },
            )
        })
    }

    if (!showPhoneButton) return null

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[5px]" />

            {/* 📱 PHONE REQUEST CARD */}
            <div className="fixed bottom-4 left-0 right-0 z-50 px-3">
                <div className="mx-auto max-w-md rounded-2xl border bg-background p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Phone size={18} className="text-primary" />
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-semibold">
                                Telefon raqam kerak
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Davom etish uchun tasdiqlang
                            </p>
                        </div>

                        <Button
                            variant="gradient"
                            className="text-white"
                            onClick={handlePhoneRequest}
                        >
                            Yuborish
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
