const EssayIllustration = () => {
    return (
        <div className="relative w-36 h-32">
            {/* Back paper */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg shadow-md transform rotate-3 border border-amber-200" />

            {/* Front paper */}
            <div className="absolute top-2 left-0 w-28 h-28 bg-white rounded-lg shadow-lg border border-amber-200 transform -rotate-2">
                {/* Header line */}
                <div className="absolute top-4 left-4 right-4 h-2.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded" />

                {/* Content lines */}
                <div className="absolute top-10 left-4 right-4 space-y-2">
                    <div className="h-1.5 bg-amber-200 rounded w-full" />
                    <div className="h-1.5 bg-amber-200 rounded w-5/6" />
                    <div className="h-1.5 bg-amber-200 rounded w-full" />
                    <div className="h-1.5 bg-amber-200 rounded w-4/5" />
                    <div className="h-1.5 bg-amber-200 rounded w-3/4" />
                </div>
            </div>

            {/* Pen decoration */}
            <div className="absolute bottom-1 right-1 w-16 h-2 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transform -rotate-45">
                <div className="absolute left-0 w-3 h-2 bg-amber-800 rounded-l-full" />
            </div>
        </div>
    )
}

export default EssayIllustration
