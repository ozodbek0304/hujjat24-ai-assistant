import { PAYMENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { formatMoney } from "@/lib/format-money"
import { Link, useLocation } from "@tanstack/react-router"
import { ArrowLeft, FileText, Wallet } from "lucide-react"
import Modal from "../custom/modal"
import { PaymentMain } from "../payments/payment"
import { Button } from "../ui/button"
import { ThemeColorToggle } from "./color-toggle"
import UserMenu from "./user-menu"
const Header = () => {
    const { openModal } = useModal(PAYMENT)
    const { data: profile } = useGet("auth/profile")
    const { pathname } = useLocation()

    
    return (
        <header className="border-b border-border glass sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {pathname === "/" ?
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary-foreground" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-xl font-bold text-foreground">
                                Hujjat
                            </span>
                            <span className="text-xl font-bold gradient-text">
                                24
                            </span>
                            <span className="text-xs font-mono  ml-1">AI</span>
                        </div>
                    </div>
                :   <Link
                        to="/"
                        className="flex text-sm items-center gap-1 bg-primary/10 hover:bg-primary/15 text-primary px-3 py-2 rounded-lg "
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Orqaga</span>
                    </Link>
                }

                <div className="flex items-center gap-3">
                    <ThemeColorToggle />
                    <Button
                        type="button"
                        variant="gradient"
                        size="sm"
                        className="gap-2 text-white"
                        onClick={openModal}
                    >
                        <Wallet className="w-4 h-4" />
                        {formatMoney(30000)} so'm
                    </Button>
                    <UserMenu />
                </div>
            </div>
            <Modal modalKey={PAYMENT}>
                <PaymentMain />
            </Modal>
        </header>
    )
}

export default Header
