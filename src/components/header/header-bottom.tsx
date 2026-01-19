import { useModal } from "@/hooks/useModal"
import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "@tanstack/react-router"
import { Grid3X3, Home, LogIn, Plus, User } from "lucide-react"
import { useState } from "react"

const BottomNav = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("home")

    const { token } = useAuthStore()
    const { openModal } = useModal("login-modal")

    const navItems = [
        { url: "/", id: "home", icon: Home, label: "Bosh sahifa" },
        { url: "/my-documents", id: "works", icon: Grid3X3, label: "Ishlarim" },
        {
            url: "/",
            id: "create",
            icon: Plus,
            label: "Yaratish",
        },
        {
            url: "/profile",
            id: "profile",
            icon: token ? User : LogIn,
            label: token ? "Profil" : "Kirish",
            isFunction: true,
        },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 border-b border-border glass   z-50 bg-card shadow-nav border-t ">
            <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id
                    const Icon = item.icon

                    if (item.isFunction) {
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (token) {
                                        navigate({ to: item.url })
                                    } else {
                                        openModal()
                                    }
                                    setActiveTab(item.id)
                                }}
                                className="flex flex-col items-center justify-center py-2 px-4 transition-colors"
                            >
                                <Icon
                                    className={`w-6 h-6 transition-colors ${
                                        isActive ? "text-primary" : (
                                            "text-muted-foreground"
                                        )
                                    }`}
                                />
                                <span
                                    className={`text-xs mt-1 transition-colors ${
                                        isActive ?
                                            "text-primary font-medium"
                                        :   "text-muted-foreground"
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </button>
                        )
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                navigate({ to: item.url })
                                setActiveTab(item.id)
                            }}
                            className="flex flex-col items-center justify-center py-2 px-4 transition-colors"
                        >
                            <Icon
                                className={`w-6 h-6 transition-colors ${
                                    isActive ? "text-primary" : (
                                        "text-muted-foreground"
                                    )
                                }`}
                            />
                            <span
                                className={`text-xs mt-1 transition-colors ${
                                    isActive ?
                                        "text-primary font-medium"
                                    :   "text-muted-foreground"
                                }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

export default BottomNav
