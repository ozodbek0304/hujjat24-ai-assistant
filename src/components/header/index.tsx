import { Link } from "@tanstack/react-router"
import { FileText } from "lucide-react"
import { ThemeColorToggle } from "./color-toggle"
const Header = () => {
    return (
        <header className="border-b border-border glass sticky top-0 z-50">
            <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-3 group cursor-pointer"
                >
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
                </Link>

                <div>
                    <ThemeColorToggle />
                </div>
            </div>
        </header>
    )
}

export default Header
