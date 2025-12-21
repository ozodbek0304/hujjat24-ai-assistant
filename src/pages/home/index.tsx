import { AlertCircle, CheckCircle, Phone } from "lucide-react"
import { useEffect, useState } from "react"

export default function TelegramWebApp() {
    const [tg, setTg] = useState(null)
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState("")
    const [error, setError] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)

    useEffect(() => {
        // Telegram Web App SDK ni yuklash
        const script = document.createElement("script")
        script.src = "https://telegram.org/js/telegram-web-app.js"
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            if (window.Telegram?.WebApp) {
                const webApp = window.Telegram.WebApp
                setTg(webApp)

                // Web App ni to'liq kengaytirish
                webApp.expand()

                // Foydalanuvchi ma'lumotlarini olish
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
                    setStatus("success")
                    setIsRegistered(true)

                    // Backend ga ma'lumot yuborish
                    sendToBackend({
                        userId: user?.id,
                        username: user?.username,
                        firstName: user?.first_name,
                        lastName: user?.last_name,
                        phone: result.responseUnsafe?.contact?.phone_number,
                        chatId: webApp.initDataUnsafe?.user?.id,
                    })

                    webApp.showAlert(
                        "Telefon raqamingiz muvaffaqiyatli yuborildi!",
                    )
                } else {
                    setError("Telefon raqam yuborilmadi")
                }
            })
        } catch (err) {
            setError("Xatolik yuz berdi: " + err.message)
        }
    }

    const sendToBackend = async (data) => {
        try {
            // Bu yerda backend API ga so'rov yuboriladi
            console.log("Backend ga yuborilayotgan ma'lumot:", data)

            // Misol uchun:
            // const response = await fetch('YOUR_BACKEND_URL/api/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data)
            // });

            setStatus("Ma'lumotlar saqlandi")
        } catch (err) {
            setError("Backend xatosi: " + err.message)
        }
    }

    const handleManualRequest = () => {
        if (tg) {
            requestPhoneNumber(tg)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
            <div className="max-w-md mx-auto mt-10">
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                            <Phone className="w-10 h-10 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Xush kelibsiz!
                        </h1>
                        <p className="text-gray-600">
                            Ro'yxatdan o'tish uchun telefon raqamingizni
                            yuboring
                        </p>
                    </div>

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
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Status Messages */}
                    {status === "success" && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-green-800">
                                    Muvaffaqiyatli!
                                </p>
                                <p className="text-sm text-green-700">
                                    Telefon raqamingiz qabul qilindi va
                                    saqlandi.
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-red-800">
                                    Xatolik
                                </p>
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    {!isRegistered && (
                        <button
                            onClick={handleManualRequest}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                        >
                            <Phone className="w-5 h-5" />
                            <span>Telefon raqam yuborish</span>
                        </button>
                    )}

                    {isRegistered && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-lg font-semibold text-gray-800">
                                Ro'yxatdan o'tdingiz!
                            </p>
                            <p className="text-gray-600 mt-2">
                                Endi xizmatlarimizdan foydalanishingiz mumkin.
                            </p>
                        </div>
                    )}

                    {/* Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            Telefon raqamingiz xavfsiz saqlanadi va faqat
                            autentifikatsiya uchun ishlatiladi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
