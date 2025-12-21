import EssayIllustration from "@/components/illustrations/EssayIllustration"
import IndependentWorkIllustration from "@/components/illustrations/IndependentWorkIllustration"
import ResearchIllustration from "@/components/illustrations/ResearchIllustration"
import TestIllustration from "@/components/illustrations/TestIllustration"
import FeatureCard from "./features-card"

const features = [
    {
        title: "Tadqiqot",
        description:
            "Ilmiy tadqiqotlar, maqolalar va hisobotlarni professional darajada tayyorlang. Barcha ma'lumotlar bilan.",
        illustration: <ResearchIllustration />,
        comingSoon: false,
        href: "/create-presentation-generate",
    },
    {
        title: "Referat",
        description:
            "Har qanday mavzuda sifatli referatlar. To'liq ma'lumotlar, rasmlar va manbalar bilan.",
        illustration: <EssayIllustration />,
        comingSoon: true,
    },
    {
        title: "Mustaqil ish",
        description:
            "Mustaqil ishlarni tez va sifatli bajarish. Kodlar, jadvallar va tushuntirishlar bilan.",
        illustration: <IndependentWorkIllustration />,
        comingSoon: true,
    },
    {
        title: "Test",
        description:
            "Testlar yarating va yechimlarni tekshiring. Ko'p tanlovli savollar va natijalar tahlili.",
        illustration: <TestIllustration />,
        comingSoon: true,
    },
]

const FeaturesGrid = () => {
    return (
        <section className="w-full mt-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Ta'lim yordamchisi
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    O'qish jarayonini osonlashtirish uchun barcha kerakli
                    vositalar bir joyda
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        illustration={feature.illustration}
                        comingSoon={feature.comingSoon}
                        href={feature.href}
                    />
                ))}
            </div>
        </section>
    )
}

export default FeaturesGrid
