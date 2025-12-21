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
    return (
        <section className="w-full mt-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    AI bilan tayyorlash
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Kerakli ishni tanlang — qolganini sun'iy intellekt bajaradi
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-3  sm:gap-6">
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
