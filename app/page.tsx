"use client";

import {
  ImageSquare,
  Export,
  Download,
  PaintBrush,
  TextAa,
  SquaresFour,
  Globe,
  Lightning,
  Sparkle,
  CheckCircle,
  CaretDown,
  GithubLogo,
  TwitterLogo
} from "@phosphor-icons/react";
import { useState } from "react";
import { GeistPixelSquare } from "geist/font/pixel";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Interactive Editor State
  const [editorData, setEditorData] = useState({
    title: "Introducing New Features",
    subtitle: "The fastest way to generate open graph images dynamically.",
    author: "Aditya",
  });

  const faqs = [
    {
      q: "Do I need to have design skills?",
      a: "Not at all. We provide pre-existing templates that are designed to look great out of the box."
    },
    {
      q: "What formats can I export?",
      a: "You can download your generated Open Graph images in both PNG and JPG formats."
    },
    {
      q: "Can I use my own fonts?",
      a: "Currently, we support a curated list of high-quality fonts to ensure the best possible rendering and compatibility across networks."
    },
    {
      q: "Is it really free?",
      a: "Yes! Currently ogimg.in is completely free to use. There are no watermarks or hidden fees on exports."
    },
    {
      q: "Do you store my data?",
      a: "No. Everything runs directly in your browser. We do not transmit or store the text or logos you apply to your templates."
    },
    {
      q: "Can I suggest a new template design?",
      a: "Absolutely! Feel free to reach out to us on Twitter or drop an issue on our GitHub repository with your idea."
    }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-primary-foreground tracking-[-0.04em]">
      <nav className="absolute top-0 inset-x-0 z-50 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 w-1/3">
            <ImageSquare size={24} weight="duotone" className="text-foreground" />
            <span className={`text-xl ${GeistPixelSquare.className} tracking-[-0.05em]`}>ogimg.in</span>
          </div>
          <div className="flex gap-6 items-center justify-center w-1/3">
            <a href="#templates" className="text-sm font-medium hover:text-foreground hover:underline underline-offset-4 transition-all">Templates</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-foreground hover:underline underline-offset-4 transition-all">How it works</a>
          </div>
          <div className="flex items-center justify-end w-1/3">
            <button className="bg-foreground text-background px-4 py-2 rounded text-sm font-semibold hover:bg-foreground/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur text-sm font-medium mb-8">
            <Sparkle size={16} className="text-muted-foreground" />
            <span>v1.0 is now live</span>
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-6 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
            Stop worrying about <br />
            <span className="text-background bg-foreground px-2">Open Graph</span> images.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto tracking-[-0.03em]">
            Generate perfectly sized, beautiful OG images for your site from pre-existing elegant templates.
            Zero design skills required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="h-12 px-8 bg-foreground text-background font-semibold rounded hover:bg-foreground/90 transition-all flex items-center gap-2">
              Start Creating
              <Export weight="bold" />
            </button>
            <button className="h-12 px-8 border border-border bg-card/50 hover:bg-accent font-semibold rounded transition-all flex items-center gap-2">
              <SquaresFour weight="bold" />
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Feature: Interactive Template Editor Preview */}
      <section className="py-24 px-6 bg-card" id="editor-preview">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
              Edit in Real-time
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto tracking-[-0.03em]">
              Select a template, tweak the copy, and see your new open graph image instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Editor Input Controls */}
            <div className="md:col-span-4 p-6 bg-background border border-border rounded-xl space-y-6 shadow-sm">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block tracking-[-0.02em]">Template Theme</label>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full border border-border bg-zinc-900 cursor-pointer ring-2 ring-primary ring-offset-2 ring-offset-background" />
                  <div className="h-8 w-8 rounded-full border border-border bg-white cursor-pointer" />
                  <div className="h-8 w-8 rounded-full border border-border bg-blue-900 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block tracking-[-0.02em]">Title</label>
                <div className="relative">
                  <TextAa className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <input
                    type="text"
                    className="w-full bg-accent/50 border border-border rounded h-10 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    value={editorData.title}
                    onChange={(e) => setEditorData({ ...editorData, title: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block tracking-[-0.02em]">Description</label>
                <textarea
                  className="w-full bg-accent/50 border border-border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  rows={3}
                  value={editorData.subtitle}
                  onChange={(e) => setEditorData({ ...editorData, subtitle: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block tracking-[-0.02em]">Author / Badge</label>
                <input
                  type="text"
                  className="w-full bg-accent/50 border border-border rounded h-10 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  value={editorData.author}
                  onChange={(e) => setEditorData({ ...editorData, author: e.target.value })}
                />
              </div>
            </div>

            {/* Preview Output */}
            <div className="md:col-span-8">
              <div className="w-full aspect-1200/630 bg-[#1a1a1a] rounded-xl border border-border shadow-2xl relative overflow-hidden flex flex-col justify-center p-12 lg:p-16">
                <div className="absolute inset-0 bg-linear-to-br from-zinc-800/20 to-zinc-900/80 pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 border border-zinc-700 rounded-full text-zinc-300 text-sm font-medium mb-8 bg-zinc-800/50 backdrop-blur-sm">
                    {editorData.author || "Your Name"}
                  </span>
                  <h3 className={`text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight ${GeistPixelSquare.className} tracking-[-0.04em]`}>
                    {editorData.title || "Your Title Here"}
                  </h3>
                  <p className="text-xl lg:text-2xl text-zinc-400 max-w-2xl font-medium tracking-tight">
                    {editorData.subtitle || "A short description goes here to explain what the page is about."}
                  </p>
                </div>
                {/* Decorative Elements inside OG Image */}
                <div className="absolute right-0 bottom-0 p-12 opacity-50 blur-sm pointer-events-none">
                  <Globe size={160} weight="thin" className="text-zinc-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Feature: Gallery of Pre-existing Templates */}
      <section className="py-24 px-6 relative" id="templates">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
                Template Gallery
              </h2>
              <p className="text-muted-foreground text-lg tracking-[-0.03em] max-w-lg">
                Choose from highly optimized, aesthetically pleasing templates designed for social media feeds.
              </p>
            </div>
            <button className="mt-4 md:mt-0 text-sm font-semibold flex items-center gap-2 hover:text-muted-foreground transition-colors group">
              View all templates <CaretDown className="group-hover:-rotate-90 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Minimalist Tech", id: 1 },
              { name: "Editorial Pixel", id: 2 },
              { name: "SaaS Launch", id: 3 },
              { name: "Blog Post", id: 4 },
              { name: "Podcast Cover", id: 5 },
              { name: "Changelog", id: 6 },
            ].map((tmpl) => (
              <div key={tmpl.id} className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-ring transition-colors cursor-pointer">
                {/* Mockup Preview */}
                <div className="aspect-1200/630 bg-zinc-900 border-b border-border flex flex-col items-center justify-center p-6 relative">
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  </div>
                  <h4 className={`text-white text-xl font-bold mb-2 ${GeistPixelSquare.className}`}>{tmpl.name}</h4>
                  <div className="h-2 w-3/4 bg-zinc-800 rounded-full" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="font-medium text-sm tracking-tight">{tmpl.name}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-foreground text-background w-8 h-8 rounded-full">
                    <PaintBrush size={14} weight="bold" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Feature: Export formats showcase */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
              Export flawlessly.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 tracking-[-0.03em]">
              Whether you need transparent PNG overlays or heavily optimized JPGs for faster loading, we support high quality exports up to 2x resolution.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border border-border rounded-xl bg-background flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="font-bold text-sm">PNG</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Transparent & Lossless</h4>
                  <p className="text-xs text-muted-foreground mt-1 tracking-tight">Ideal for overlapping elements</p>
                </div>
              </div>
              <div className="p-6 border border-border rounded-xl bg-background flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="font-bold text-sm">JPEG</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Compressed</h4>
                  <p className="text-xs text-muted-foreground mt-1 tracking-tight">Best for page speed & SEO</p>
                </div>
              </div>
            </div>

            <button className="mt-8 px-6 py-3 bg-background border border-border shadow-sm rounded flex items-center gap-2 text-sm font-semibold hover:bg-accent transition-colors">
              <Download weight="bold" /> Try Exporting a Sample
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract rendering" className="w-full h-full object-cover rounded-2xl grayscale border border-border relative z-10 opacity-80" />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border shadow-xl p-4 rounded-xl z-20 flex gap-4 pr-12">
                <CheckCircle size={24} weight="fill" className="text-foreground" />
                <div>
                  <p className="text-sm font-bold tracking-tight">Export Complete</p>
                  <p className="text-xs text-muted-foreground">og-image-final.png (142kb)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
              How it works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto tracking-[-0.03em]">
              Just three simple steps to beautiful metadata.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-accent border border-border flex items-center justify-center mb-6">
                <SquaresFour size={28} className="text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Pick a template</h3>
              <p className="text-muted-foreground tracking-tight text-sm">Browse our carefully curated gallery of designs tailored for high CTR.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-2xl bg-accent border border-border flex items-center justify-center mb-6">
                <TextAa size={28} className="text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Adjust the content</h3>
              <p className="text-muted-foreground tracking-tight text-sm">Add your copy, change the badge, upload your company logo seamlessly.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center mb-6">
                <Download size={28} weight="bold" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Download</h3>
              <p className="text-muted-foreground tracking-tight text-sm">Grab your PNG or JPG file instantly. Attach it to your head tags and you run!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold mb-12 text-center ${GeistPixelSquare.className} tracking-[-0.05em]`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg bg-background overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-medium tracking-tight hover:bg-accent/50 transition-colors"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  {faq.q}
                  <CaretDown className={`transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-2 text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-10 pb-10 px-6 border-t border-border mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ImageSquare size={20} weight="duotone" />
            <span className={`font-bold ${GeistPixelSquare.className}`}>ogimg.in</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ogimg.in. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><TwitterLogo size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><GithubLogo size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
