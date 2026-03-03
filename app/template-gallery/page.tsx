import Link from "next/link";
import Image from "next/image";
import { GeistPixelSquare } from "geist/font/pixel";
import { TEMPLATE_LIBRARY } from "../components/templates/templateRegistry";
import TemplateGalleryPreview from "../components/TemplateGalleryPreview";

export default function TemplateGalleryPage() {
    return (
        <div className="min-h-screen bg-background text-foreground px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between gap-4 mb-10">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <span aria-hidden="true">{"<"}</span>
                        Back to home
                    </Link>
                    <div className="flex items-center gap-2">
                        <Image src="/ogimg.png" alt="ogimg logo" width={24} height={24} className="rounded-sm bg-white p-0.5" />
                        <span className={`text-xl ${GeistPixelSquare.className} tracking-[-0.05em]`}>ogimg.in</span>
                    </div>
                </div>

                <div className="mb-10">
                    <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
                        Template Gallery
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl tracking-[-0.03em]">
                        Pick a template to start editing. Every template opens in the editor with full controls.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TEMPLATE_LIBRARY.map((template) => (
                        <Link
                            key={template.id}
                            href={`/editor/${template.id}`}
                            className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-ring transition-colors"
                        >
                            <TemplateGalleryPreview templateId={template.id} />
                            <div className="px-4 py-3 border-t border-border/60 bg-card/95">
                                <p className="text-sm font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
                                    {template.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{template.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
