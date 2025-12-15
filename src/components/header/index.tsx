import { Link, useLocation } from "@tanstack/react-router"
import { ArrowLeft, FileText, Sparkles, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { ThemeColorToggle } from "./color-toggle"
const Header = () => {
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
                        className="flex items-center gap-2 "
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Orqaga</span>
                    </Link>
                }

                {pathname !== "/" && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">TadqiqotAI</span>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <ThemeColorToggle />
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                        <Zap className="w-3.5 h-3.5 " />
                        <span className="text-xs font-medium ">Beta</span>
                    </div>
                    <Button variant="gradient" size="sm" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Pro versiya
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header
