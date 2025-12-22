import { Button } from "@/components/ui/button"
import {
    LOGIN_TELEGRAM,
    LOGIN_TELEGRAM_REGISTER,
} from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"
import { useAuthStore } from "@/store/auth-store"
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
                webApp.ready?.()
                webApp.setHeaderColor?.("#ffffff")
                webApp.setBackgroundColor?.("#ffffff")

                // ⛔️ Yopishni tasdiqlashni o'chirish (muhim!)
                webApp.disableClosingConfirmation?.()

                // ⛔️ Scroll va swipe harakatlarini bloklash
                document.body.style.overscrollBehavior = "none"
                document.body.style.touchAction = "pan-y" // Faqat vertical scroll
                document.documentElement.style.overscrollBehavior = "none"
                document.documentElement.style.touchAction = "pan-y"

                // ⛔️ Tepadan tortishni bloklash uchun
                let startY = 0
                const preventPullToClose = (e: TouchEvent) => {
                    const touch = e.touches[0]
                    if (e.type === "touchstart") {
                        startY = touch.clientY
                    } else if (e.type === "touchmove") {
                        const currentY = touch.clientY
                        const scrollTop =
                            window.pageYOffset ||
                            document.documentElement.scrollTop

                        // Agar sahifa tepasida bo'lsa va pastga tortilayotgan bo'lsa
                        if (scrollTop === 0 && currentY > startY) {
                            e.preventDefault()
                        }
                    }
                }

                document.addEventListener("touchstart", preventPullToClose, {
                    passive: false,
                })
                document.addEventListener("touchmove", preventPullToClose, {
                    passive: false,
                })

                setTg(webApp)

                const user = webApp.initDataUnsafe?.user
                if (user?.id) {
                    autoLogin(user)
                }

                // Cleanup function'ga qo'shish
                return () => {
                    document.removeEventListener(
                        "touchstart",
                        preventPullToClose,
                    )
                    document.removeEventListener(
                        "touchmove",
                        preventPullToClose,
                    )
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

    return (
        <div className="w-full px-2 pb-1  fixed left-0 right-0 bottom-0 z-20">
            {showPhoneButton && (
                <Button
                    variant="gradient"
                    className="w-full text-white"
                    onClick={handlePhoneRequest}
                >
                    Telefon raqam yuborish
                </Button>
            )}
        </div>
    )
}
