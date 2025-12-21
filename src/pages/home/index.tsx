import { useEffect, useState } from "react"

export default function TelegramWebApp() {
    const [tg, setTg] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://telegram.org/js/telegram-web-app.js"
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            if (window.Telegram?.WebApp) {
                const webApp = window.Telegram.WebApp
                setTg(webApp)
                webApp.expand()

                if (webApp.initDataUnsafe?.user) {
                    setUser(webApp.initDataUnsafe.user)
                }

                // Main button ni sozlash
                webApp.MainButton.text = "Telefon raqam yuborish"
                webApp.MainButton.show()

                // Main button bosilganda
                webApp.MainButton.onClick(() => {
                    requestPhoneNumber(webApp)
                })
            }
        }

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [])

    const requestPhoneNumber = (webApp) => {
        try {
            // Telegram Web App orqali telefon raqam so'rash
            webApp.requestContact((result) => {
                if (result) {
                    setUser((prev) => ({
                        ...prev,
                        phone_number:
                            webApp.initDataUnsafe.user?.phone_number ||
                            "+998XXYYYZZZZ",
                    }))

                    webApp.showAlert(
                        "Telefon raqamingiz muvaffaqiyatli yuborildi!",
                    )
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
            {/* User Info */}
            {user && (
                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {user.first_name?.[0] || "U"}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">
                                {user.first_name} {user.last_name || ""}
                            </p>
                            {user.username && (
                                <p className="text-sm text-gray-600">
                                    @{user.username}
                                </p>
                            )}
                            <p className="text-xs text-gray-500">
                                ID: {user.id}
                            </p>
                            <p className="text-xs text-gray-500">
                                Telefon raqam:{" "}
                                {user.phone_number || "Yuborilmagan"}
                            </p>
                            <p className="text-xs text-gray-500">
                                ma'lumot: {JSON.stringify(tg)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
