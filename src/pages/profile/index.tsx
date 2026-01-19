import { PAYMENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useTheme } from "@/layouts/theme"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "@tanstack/react-router"
import {
    CreditCard,
    FileText,
    LogOut,
    Moon,
    Sun,
    User,
    Wallet,
} from "lucide-react"
import { toast } from "sonner"

const Profile = () => {
    const navigate = useNavigate()
    const { clearToken } = useAuthStore()
    const { theme, setTheme } = useTheme()
    const { openModal: openModalPayment } = useModal(PAYMENT)

    const { data: profile } = useGet<Profile>("auth/profile")

    const handleTopUpBalance = () => {
        openModalPayment()
    }

    const handlePaymentHistory = () => {
        navigate({ to: "/payments-history" })
    }

    const handleMyDocuments = () => {
        navigate({ to: "/my-documents" })
    }

    const handleToggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const functionLogOut = () => {
        clearToken()
        toast.info("Muvaffaqiyatli chiqdingiz!")
    }

    /* ====== MENU ====== */

    const menuItems = [
        {
            icon: Wallet,
            label: "Hisobni to'ldirish",
            value: `${profile?.wallet?.toLocaleString()} so'm`,
            onClick: handleTopUpBalance,
        },
        {
            icon: CreditCard,
            label: "To'lovlar tarixi",
            onClick: handlePaymentHistory,
        },
        {
            icon: FileText,
            label: "Mening hujjatlarim",
            onClick: handleMyDocuments,
        },
        {
            icon: theme === "dark" ? Sun : Moon,
            label: theme === "dark" ? "Light rejim" : "Dark rejim",
            onClick: handleToggleTheme,
        },
    ]

    return (
        <div className="space-y-3 animate-fade-in max-w-lg w-full">
            {/* Profile */}
            <div className="dark:bg-card bg-gray-100 rounded-2xl p-3 shadow-card">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-foreground">
                            {profile?.first_name} {profile?.last_name}
                        </h2>
                        <p className="text-muted-foreground">
                            {formatPhoneNumber(String(profile?.phone))}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="dark:bg-card bg-gray-100 rounded-2xl p-3 shadow-card">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-secondary rounded-xl">
                        <p className="text-2xl font-bold gradient-text">
                            {formatMoney(profile?.wallet)} so'm
                        </p>
                        <p className="text-sm text-muted-foreground">Balans</p>
                    </div>
                    <div className="text-center p-3 bg-secondary rounded-xl">
                        <p className="text-2xl font-bold gradient-text">
                            {profile?.telegram_user_id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Jami ishlar
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="dark:bg-card bg-gray-100 rounded-2xl shadow-card overflow-hidden">
                {menuItems.map((item, index) => (
                    <button
                        key={item.label}
                        onClick={item.onClick}
                        className={`w-full flex items-center gap-4 p-3 hover:bg-secondary transition-colors ${
                            index !== menuItems.length - 1 ?
                                "border-b border-border"
                            :   ""
                        }`}
                    >
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="flex-1 text-left font-medium text-foreground">
                            {item.label}
                        </span>
                        {item.value && (
                            <span className="font-semibold gradient-text">
                                {item.value}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Logout */}
            <button
                type="button"
                onClick={functionLogOut}
                className="w-full dark:bg-card bg-gray-100 rounded-2xl p-3 shadow-card flex items-center gap-4 hover:bg-secondary transition-colors text-destructive"
            >
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-destructive" />
                </div>
                <span className="font-medium">Chiqish</span>
            </button>
        </div>
    )
}

export default Profile
