import { Clock } from "lucide-react"

const TestIllustration = () => {
    return (
        <div className="relative w-24 h-20">
            {/* Test paper */}
            <div className="absolute top-0 left-0 w-24 h-20 bg-white rounded-lg shadow-lg border border-violet-200">
                {/* Header */}
                <div className="absolute top-2 left-2 right-3">
                    <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded w-16 mb-3" />
                </div>

                {/* Questions */}
                <div className="absolute top-6 left-2 right-3 space-y-1">
                    {/* Question 1 */}
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded border-2 border-violet-400 flex items-center justify-center bg-violet-500">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-2 h-2 text-white"
                            >
                                <path
                                    d="M20 6L9 17l-5-5"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                />
                            </svg>
                        </div>
                        <div className="h-1 bg-violet-200 rounded flex-1" />
                    </div>

                    {/* Question 2 */}
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded border-2 border-violet-300" />
                        <div className="h-1 bg-violet-200 rounded w-4/5" />
                    </div>

                    {/* Question 3 */}
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded border-2 border-violet-300" />
                        <div className="h-1 bg-violet-200 rounded w-3/4" />
                    </div>
                    
                </div>
            </div>

            {/* Timer/Clock */}
            <div className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full shadow-lg flex items-center justify-center">
                <Clock className="w-4 h-4" />
            </div>

            {/* A+ badge */}
            <div className="absolute bottom-1 right-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-1 rounded-full shadow-md">
                A+
            </div>

            {/* Decorative stars */}
            <div className="absolute bottom-0 left-0 text-violet-400 text-lg">
                ✦
            </div>
            <div className="absolute bottom-4 left-6 text-purple-300 text-sm">
                ✦
            </div>
        </div>
    )
}

export default TestIllustration
