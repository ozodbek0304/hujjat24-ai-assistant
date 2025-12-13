import ParamInput from "@/components/as-params/input"
import { Sparkles, Wand2 } from "lucide-react"

const TopicInput = () => {
    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-pink-600 text-primary-foreground shadow-lg shadow-primary/30 scale-110 border border-primary/20 flex items-center justify-center  font-bold text-sm">
                    1
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                    Mavzuni yozing
                </h2>
            </div>

            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-pink-500 to-accent rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-500" />
                <div className="relative">
                    <ParamInput
                        wrapperClassName="h-16"
                        fullWidth
                        placeholder="Masalan: Sun'iy intellekt va uning ta'limda qo'llanilishi"
                        className="h-16 pl-6 pr-16 text-lg bg-card  rounded-2xl  transition-all duration-300 placeholder:text-muted-foreground/50"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                            <Wand2 className="w-5 h-5 text-primary-foreground" />
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI sizning mavzuingiz bo'yicha professional hujjat yaratadi
            </p>
        </div>
    )
}

export default TopicInput
