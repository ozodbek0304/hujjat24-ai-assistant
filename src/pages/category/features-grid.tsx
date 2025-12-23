import { useTelegramUser } from "@/hooks/useIsTelegram"
import { cn } from "@/lib/utils"
import FeatureCard from "./features-card"

const features = [
    {
        title: "Taqdimot",
        description: "Tez va professional tayyorlash.",
        image: "/taqdimot.png",
        comingSoon: false,
        href: "/create-presentation",
    },
    {
        title: "Mustaqil ish",
        description: "Mustaqil ishlarni oson va tez bajarish.",
        image: "/kurs-ishlar.png",
        comingSoon: true,
    },
    {
        title: "Referat",
        description: "Har qanday mavzuda tayyor va sifatli referatlar.",
        image: "/referatlar.png",
        comingSoon: true,
    },
    {
        title: "Test",
        description: "Testlar yaratish va natijalarni tekshirish.",
        image: "/test.png",
        comingSoon: true,
    },
]

const FeaturesGrid = () => {
    const telegramUser = useTelegramUser()

    return (
        <section className="w-full sm:mt-12 mt-6">
            <div className="text-center mb-12 ">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    AI bilan tayyorlash
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Kerakli ishni tanlang — qolganini sun'iy intellekt bajaradi
                </p>
            </div>
            <div
                className={cn(
                    "grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-3  sm:gap-6",
                    telegramUser.isTelegram &&
                        telegramUser.user_id &&
                        "lg:grid-cols-2",
                )}
            >
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        image={feature.image}
                        comingSoon={feature.comingSoon}
                        href={feature.href}
                    />
                ))}
            </div>
        </section>
    )
}

export default FeaturesGrid
