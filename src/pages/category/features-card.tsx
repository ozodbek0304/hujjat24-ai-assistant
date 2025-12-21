import { Link } from "@tanstack/react-router"

interface FeatureCardProps {
    title: string
    description: string
    image: string
    comingSoon?: boolean
    href?: string
    className?: string
}

const FeatureCard = ({
    title,
    description,
    image,
    comingSoon = false,
    href,
    className = "",
}: FeatureCardProps) => {
    const cardContent = (
        <>
            {comingSoon && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                    Tez orada
                </div>
            )}
            <div className="h-20 min-w-20 sm:h-28 sm:w-28">
                <img className="w-full h-full" src={image} alt={title} />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </>
    )

    const baseClasses = `relative bg-card rounded-2xl z-10 p-4   border flex sm:flex-col items-start gap-4 transition-all duration-300 hover:scale-[1.02]  ${comingSoon ? "opacity-90 cursor-not-allowed" : "cursor-pointer"} ${className}`

    if (href && !comingSoon) {
        return (
            <Link to={href} className={baseClasses}>
                {cardContent}
            </Link>
        )
    }

    return <div className={baseClasses}>{cardContent}</div>
}

export default FeatureCard
