import { AnimatePresence, motion } from "framer-motion"
import { FileText, Image, Sparkles, Wand2 } from "lucide-react"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
    isVisible: boolean
    progress: number
    currentStep: string
}

const loadingSteps = [
    { icon: FileText, text: "Mavzu tahlil qilinmoqda..." },
    { icon: Sparkles, text: "AI kontent yaratmoqda..." },
    { icon: Image, text: "Rasmlar generatsiya qilinmoqda..." },
    { icon: Wand2, text: "Dizayn optimallashtirilmoqda..." },
]

const LoadingScreen = ({
    isVisible,
    progress,
    currentStep,
}: LoadingScreenProps) => {
    const [dots, setDots] = useState("")

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
            }, 1500)
            return () => clearInterval(interval)
        }
    }, [isVisible])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
                >
                    <div className="w-full max-w-md px-6">
                        {/* AI Logo Animation */}
                        <motion.div
                            className="flex justify-center mb-8"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center glow-effect">
                                    <Sparkles className="w-12 h-12 text-primary-foreground animate-pulse-slow" />
                                </div>
                                <motion.div
                                    className="absolute -inset-4 rounded-3xl border-2 border-primary/30"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-bold text-center text-foreground mb-2"
                        >
                            AI Prezentatsiya yaratmoqda{dots}
                        </motion.h2>
                        <p className="text-muted-foreground text-center mb-8">
                            Sizning mukammal prezentatsiyangiz tayyorlanmoqda
                        </p>

                        {/* Progress Bar */}
                        <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-6">
                            <motion.div
                                className="absolute left-0 top-0 h-full gradient-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ left: ["-20%", "120%"] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </div>

                        {/* Progress Percentage */}
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-sm text-muted-foreground">
                                {currentStep}
                            </span>
                            <span className="text-sm font-semibold gradient-text">
                                {progress}%
                            </span>
                        </div>

                        {/* Loading Steps */}
                        <div className="space-y-3">
                            {loadingSteps.map((step, index) => {
                                const stepProgress = (index + 1) * 25
                                const isActive =
                                    progress >= stepProgress - 25 &&
                                    progress < stepProgress
                                const isComplete = progress >= stepProgress

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                            isActive ?
                                                "bg-primary/10 border border-primary/30"
                                            : isComplete ? "bg-secondary/50"
                                            : "bg-transparent"
                                        }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                isComplete ? "gradient-primary"
                                                : isActive ? "bg-primary/20"
                                                : "bg-secondary"
                                            }`}
                                        >
                                            <step.icon
                                                className={`w-4 h-4 ${
                                                    isComplete ?
                                                        "text-primary-foreground"
                                                    : isActive ?
                                                        "text-primary animate-pulse"
                                                    :   "text-muted-foreground"
                                                }`}
                                            />
                                        </div>
                                        <span
                                            className={`text-sm ${
                                                isComplete ? "text-foreground"
                                                : isActive ? "text-primary"
                                                : "text-muted-foreground"
                                            }`}
                                        >
                                            {step.text}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                className="ml-auto w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />
                                        )}
                                        {isComplete && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="ml-auto text-primary"
                                            >
                                                ✓
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingScreen
