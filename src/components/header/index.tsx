import { FileText } from "lucide-react"
const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
                        <span className="text-xs font-mono text-accent ml-1">
                            AI
                        </span>
                    </div>
                </div>

                {/* <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">Beta</span>
          </div>
          <Button variant="gradient" size="sm" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Pro versiya
          </Button>
        </div> */}
            </div>
        </header>
    )
}

export default Header
