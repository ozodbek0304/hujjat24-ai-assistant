import { Button } from "@/components/ui/button"
import { ArrowLeft, Rocket, Sparkles } from "lucide-react"
import { useState } from "react"
import DocumentTypeSelector from "./document-type-selector"
import GeneratedDocument from "./generated-document"
import LoadingState from "./loading-state"
import StyleSelector from "./style-selector"
import TopicInput from "./topic-input"

const MainSection = () => {
    const [topic, setTopic] = useState("")
    const [selectedDocumentType, setSelectedDocumentType] = useState<
        string | null
    >(null)
    const [generatedContent, setGeneratedContent] = useState<string | null>(
        null,
    )
    const [isGenerating, setIsGenerating] = useState(false)
 
    return (
        <main>
            {/* Hero section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                        Sun'iy intellekt kuchi
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                    AI bilan{" "}
                    <span className="gradient-text text-glow">Hujjat </span>
                    yarating
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Mavzuingizni kiriting, hujjat turini tanlang va{" "}
                    <span className="text-foreground font-medium">
                        bir necha soniyada
                    </span>{" "}
                    professional hujjat yarating
                </p>
            </div>

            {/* Main content */}
            <div>
                {isGenerating ?
                    <LoadingState />
                : generatedContent ?
                    <GeneratedDocument
                        content={generatedContent}
                        topic={topic}
                        documentType={selectedDocumentType || ""}
                        onRegenerate={() => {}}
                        isLoading={isGenerating}
                    />
                :   <div className="space-y-12">
                        <TopicInput />

                        <DocumentTypeSelector />
                        <StyleSelector />

                        <div className="flex justify-center">
                            <Button variant="glow" size="xl" className="gap-3">
                                <Rocket className="w-5 h-5" />
                                Hujjat yaratish
                            </Button>
                        </div>
                    </div>
                }

                {/* Back to start */}
                {generatedContent && (
                    <div className="mt-10 text-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                setGeneratedContent(null)
                                setTopic("")
                                setSelectedDocumentType(null)
                            }}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Yangi hujjat yaratish
                        </Button>
                    </div>
                )}
            </div>
        </main>
    )
}

export default MainSection
