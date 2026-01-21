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
        comingSoon: false,
        href: "/independent-work-create",
    },
    {
        title: "Referat",
        description: "Har qanday mavzuda tayyor va sifatli referatlar.",
        image: "/referatlar.png",
        comingSoon: false,
        href: "/abstract-create",
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
        <section className="w-full  mt-6">
            <div className="text-center mb-8 ">
                <h1 className="text-3xl  font-bold text-foreground mb-2">
                    AI bilan tayyorlash
                </h1>
                <p className=" text-muted-foreground  mx-auto">
                    Kerakli ishni tanlang — qolganini sun'iy intellekt bajaradi
                </p>
            </div>
            <div className={"space-y-3"}>
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
