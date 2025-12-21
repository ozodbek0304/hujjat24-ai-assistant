const ResearchIllustration = () => {
    return (
        <div className="relative w-36 h-20">
            {/* Magnifying glass */}
            <div className="absolute top-2 left-0 w-7 h-7 rounded-full border-4 border-blue-500 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
                <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white/60 rounded-full" />
            </div>
            <div className="absolute top-9 left-4 w-7 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform rotate-45 shadow-md" />

            {/* Document behind */}
            <div className="absolute top-0 right-2 w-24 h-20 bg-white rounded-lg shadow-lg border border-blue-200">
                <div className="absolute top-3 left-3 right-3 space-y-1">
                    <div className="h-2 bg-blue-400 rounded w-full" />
                    <div className="h-1.5 bg-blue-200 rounded w-4/5" />
                    <div className="h-1.5 bg-blue-200 rounded w-3/5" />
                    <div className="h-1.5 bg-blue-200 rounded w-4/5" />
                </div>
                {/* Chart */}
                <div className="absolute bottom-1 left-3 right-3 flex items-end gap-1 h-6">
                    <div className="w-3 h-3 bg-blue-300 rounded-t" />
                    <div className="w-3 h-5 bg-blue-400 rounded-t" />
                    <div className="w-3 h-4 bg-blue-500 rounded-t" />
                    <div className="w-3 h-4 bg-blue-500 rounded-t" />
                    <div className="w-3 h-6 bg-blue-600 rounded-t" />
                </div>
            </div>
        </div>
    )
}

export default ResearchIllustration
