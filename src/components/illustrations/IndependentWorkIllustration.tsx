const IndependentWorkIllustration = () => {
    return (
        <div className="relative w-24 h-20">
            {/* Laptop */}
            <div className="absolute top-0 left-0 w-24 h-16">
                {/* Screen */}
                <div className="w-full h-[70px] bg-gradient-to-b from-emerald-400 to-teal-500 rounded-t-lg border-2 border-emerald-600 shadow-lg">
                    {/* Code lines */}
                    <div className="p-2 space-y-1.5">
                        <div className="w-11 h-1.5 bg-white/80 rounded" />
                        <div className="w-12 h-1.5 bg-white/60 rounded" />
                        <div className="w-16 h-1.5 bg-emerald-200 rounded" />
                        <div className="w-11 h-1.5 bg-white/50 rounded" />
                        <div className="w-9 h-1.5 bg-teal-200 rounded" />
                    </div>
                </div>
                {/* Keyboard base */}
                <div className="w-full h-2 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-sm" />
            </div>

            {/* Gear decoration */}
            <div className="absolute top-1 right-2 w-5 h-5">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full text-white"
                >
                    <path
                        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                        fill="currentColor"
                        opacity="0.6"
                    />
                    <path
                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>

            {/* Checkmark badge */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-whtext-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-white"
                >
                    <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    )
}

export default IndependentWorkIllustration
