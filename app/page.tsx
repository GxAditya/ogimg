"use client";

import {
  Export,
  Download,
  TextAa,
  SquaresFour,
  Globe,
  Sparkle,
  CheckCircle,
  CaretDown,
  GithubLogo,
  XLogo
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";
import { TEMPLATE_LIBRARY } from "./components/templates/templateRegistry";
import TemplateGalleryPreview from "./components/TemplateGalleryPreview";
import { CHANGELOG_ENTRIES } from "./components/changelogData";
import { SITE_NAME, SITE_URL } from "./lib/seo";

type ResultShot = {
  id: number;
  src: string;
  alt: string;
  sizeClass: string;
  entryX: number;
  entryY: number;
  entryRotate: number;
  exitX: number;
  exitY: number;
  exitRotate: number;
};

const RESULT_SHOTS: ResultShot[] = [
  {
    id: 1,
    src: "/1.webp",
    alt: "Open Graph result sample 1",
    sizeClass: "w-[min(88vw,760px)]",
    entryX: -720,
    entryY: -360,
    entryRotate: -24,
    exitX: 760,
    exitY: -140,
    exitRotate: 14
  },
  {
    id: 2,
    src: "/2.webp",
    alt: "Open Graph result sample 2",
    sizeClass: "w-[min(88vw,720px)]",
    entryX: 690,
    entryY: -320,
    entryRotate: 20,
    exitX: -760,
    exitY: -80,
    exitRotate: -16
  },
  {
    id: 3,
    src: "/3.webp",
    alt: "Open Graph result sample 3",
    sizeClass: "w-[min(88vw,740px)]",
    entryX: -760,
    entryY: -120,
    entryRotate: -18,
    exitX: 680,
    exitY: 320,
    exitRotate: 14
  },
  {
    id: 4,
    src: "/4.webp",
    alt: "Open Graph result sample 4",
    sizeClass: "w-[min(88vw,710px)]",
    entryX: 760,
    entryY: -40,
    entryRotate: 16,
    exitX: -720,
    exitY: 300,
    exitRotate: -14
  },
  {
    id: 5,
    src: "/5.webp",
    alt: "Open Graph result sample 5",
    sizeClass: "w-[min(88vw,760px)]",
    entryX: 0,
    entryY: 700,
    entryRotate: -8,
    exitX: 0,
    exitY: -720,
    exitRotate: 8
  },
  {
    id: 6,
    src: "/6.webp",
    alt: "Open Graph result sample 6",
    sizeClass: "w-[min(88vw,730px)]",
    entryX: -700,
    entryY: 360,
    entryRotate: -20,
    exitX: 740,
    exitY: -360,
    exitRotate: 18
  },
  {
    id: 7,
    src: "/7.webp",
    alt: "Open Graph result sample 7",
    sizeClass: "w-[min(88vw,740px)]",
    entryX: 730,
    entryY: 330,
    entryRotate: 22,
    exitX: -760,
    exitY: -260,
    exitRotate: -16
  },
  {
    id: 8,
    src: "/8.webp",
    alt: "Open Graph result sample 8",
    sizeClass: "w-[min(88vw,700px)]",
    entryX: 0,
    entryY: -720,
    entryRotate: -14,
    exitX: 780,
    exitY: 120,
    exitRotate: 11
  },
  {
    id: 9,
    src: "/9.webp",
    alt: "Open Graph result sample 9",
    sizeClass: "w-[min(88vw,730px)]",
    entryX: 300,
    entryY: 720,
    entryRotate: 12,
    exitX: -680,
    exitY: -440,
    exitRotate: -14
  }
];

type ResultMeteorCardProps = {
  shot: ResultShot;
  progress: MotionValue<number>;
  index: number;
  total: number;
};

function ResultMeteorCard({ shot, progress, index, total }: ResultMeteorCardProps) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const phase = useTransform(progress, [start, end], [0, 1], { clamp: true });

  const x = useTransform(phase, [0, 0.32, 0.78, 0.9, 1], [shot.entryX, 0, 0, shot.exitX * 0.32, shot.exitX]);
  const y = useTransform(phase, [0, 0.32, 0.78, 0.9, 1], [shot.entryY, 0, 0, shot.exitY * 0.32, shot.exitY]);
  const rotate = useTransform(
    phase,
    [0, 0.32, 0.78, 0.9, 1],
    [shot.entryRotate, 0, 0, shot.exitRotate * 0.35, shot.exitRotate]
  );
  const opacity = useTransform(phase, [0, 0.2, 0.8, 0.92, 1], [0, 1, 1, 0.9, 0]);
  const scale = useTransform(phase, [0, 0.28, 0.8, 1], [0.76, 1, 1, 0.86]);
  const blurAmount = useTransform(phase, [0, 0.28, 0.84, 1], [10, 0, 0, 8]);
  const blurFilter = useTransform(blurAmount, (value) => `blur(${value.toFixed(1)}px)`);

  const entryTrailAngle = Math.atan2(-shot.entryY, -shot.entryX) * (180 / Math.PI);
  const exitTrailAngle = Math.atan2(-shot.exitY, -shot.exitX) * (180 / Math.PI);
  const trailOpacity = useTransform(phase, [0, 0.2, 0.34, 0.66, 0.82, 1], [0, 0.95, 0.1, 0.1, 0.7, 0]);
  const trailAngle = useTransform(phase, (value) => (value < 0.68 ? entryTrailAngle : exitTrailAngle));

  return (
    <motion.figure
      className={`absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 ${shot.sizeClass}`}
      style={{ x, y, rotate, opacity, scale, filter: blurFilter, zIndex: total + index + 2 }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-44 md:w-72 -translate-x-1/2 -translate-y-1/2 origin-left bg-gradient-to-r from-cyan-100/90 via-cyan-200/40 to-transparent"
        style={{ opacity: trailOpacity, rotate: trailAngle }}
      />
      <div className="relative overflow-hidden rounded-[1.15rem] border border-zinc-700/80 bg-zinc-950/90 backdrop-blur-sm">
        <Image src={shot.src} alt={shot.alt} width={560} height={294} className="h-auto w-full object-cover" />
      </div>
    </motion.figure>
  );
}

export default function LandingPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const marqueeTemplates = [...TEMPLATE_LIBRARY, ...TEMPLATE_LIBRARY];
  const latestChangelogEntries = CHANGELOG_ENTRIES.slice(0, 2);
  const resultsSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: resultsSectionRef,
    offset: ["start start", "end end"]
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [8, -8]);

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

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DesignApplication",
    applicationSubCategory: "Open Graph Image Generator",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    url: SITE_URL,
    description: "Create beautiful Open Graph images in your browser using editable templates, custom backgrounds, and fast exports.",
    image: `${SITE_URL}/ogimg-og.png`,
    sameAs: ["https://github.com/GxAditya/ogimg"]
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-200 selection:text-zinc-900 tracking-[-0.04em]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <nav className="absolute top-0 inset-x-0 z-50 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 w-1/3">
            <Image src="/ogimg.png" alt="ogimg logo" width={28} height={28} className="rounded-sm bg-white p-0.5" />
            <span className={`text-xl ${GeistPixelSquare.className} tracking-[-0.05em]`}>ogimg.in</span>
          </div>
          <div className="flex gap-6 items-center justify-center w-1/3">
            <Link href="/template-gallery" className="text-sm font-medium hover:text-foreground hover:underline underline-offset-4 transition-all">Templates</Link>
            <a href="#how-it-works" className="text-sm font-medium hover:text-foreground hover:underline underline-offset-4 transition-all">How it works</a>
          </div>
          <div className="flex items-center justify-end w-1/3">
            <Link
              href="/template-gallery"
              className="bg-foreground text-background px-4 py-2 rounded text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden relative bg-[#0a0a0a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur text-sm font-medium mb-8">
            <Sparkle size={16} className="text-muted-foreground" />
            <span>Free and Open Source</span>
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-6 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
            Stop worrying about <br />
            <span className="text-black bg-zinc-100 px-2">Open Graph</span> images.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto tracking-[-0.03em]">
            Generate perfectly sized, beautiful OG images for your site from pre-existing elegant templates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/template-gallery"
              className="h-12 px-8 bg-zinc-100 text-black font-semibold rounded hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Start Creating
              <Export weight="bold" />
            </Link>
            <Link
              href="https://github.com/GxAditya/ogimg"
              target="_blank"
              rel="noreferrer"
              className="h-12 px-8 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 font-semibold rounded transition-all flex items-center gap-2"
            >
              <GithubLogo weight="bold" />
              GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll Results Sequence */}
      <section
        ref={resultsSectionRef}
        className="relative bg-[#0a0a0a]"
        id="results-showcase"
        style={{ height: `${RESULT_SHOTS.length * 130}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6 pt-20 pb-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 inline-flex rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-200">
                Product Results
              </p>
              <h2 className={`text-3xl md:text-5xl font-bold tracking-[-0.05em] ${GeistPixelSquare.className}`}>
                Scroll through our best outputs
              </h2>
            </div>

            <motion.div
              className="relative mt-4 min-h-[320px] flex-1 md:mt-10 md:min-h-[460px]"
              style={{ y: stageY }}
            >
              {RESULT_SHOTS.map((shot, index) => (
                <ResultMeteorCard
                  key={shot.id}
                  shot={shot}
                  progress={scrollYProgress}
                  index={index}
                  total={RESULT_SHOTS.length}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Feature: Gallery of Pre-existing Templates */}
      <section className="py-24 px-0 relative bg-[#0a0a0a]" id="templates">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
                Template Gallery
              </h2>
              <p className="text-zinc-400 text-lg tracking-[-0.03em] max-w-lg">
                Pick a template and start editing.
              </p>
            </div>
            <Link href="/template-gallery" className="mt-4 md:mt-0 text-sm font-semibold flex items-center gap-2 hover:text-muted-foreground transition-colors group">
              View all templates <CaretDown className="group-hover:-rotate-90 transition-transform" />
            </Link>
          </div>

          <div className="relative template-marquee-wrapper">
            <div className="template-marquee-track flex w-max gap-5 py-2">
              {marqueeTemplates.map((template, index) => (
                <Link
                  key={`${template.id}-${index}`}
                  href={`/editor/${template.id}`}
                  className="group w-[350px] shrink-0 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden hover:border-zinc-600 transition-colors"
                >
                  <TemplateGalleryPreview templateId={template.id} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Feature Section */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-zinc-900/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
              SEO-ready social previews
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl mx-auto tracking-[-0.03em]">
              Build Open Graph images that improve click-through rate on X, LinkedIn, Discord, and search result shares. ogimg.in helps you ship consistent, crawl-friendly metadata visuals in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <article className="p-5 rounded-xl border border-zinc-800 bg-zinc-950">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                <CheckCircle size={18} weight="fill" className="text-zinc-200" />
              </div>
              <h3 className="text-base font-semibold mb-2">Consistent Open Graph metadata</h3>
              <p className="text-sm text-zinc-400">
                Match your brand title, description, and preview image layout across every URL to reduce visual mismatch in social feeds.
              </p>
            </article>
            <article className="p-5 rounded-xl border border-zinc-800 bg-zinc-950">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                <Globe size={18} className="text-zinc-200" />
              </div>
              <h3 className="text-base font-semibold mb-2">Faster publishing workflow</h3>
              <p className="text-sm text-zinc-400">
                Generate PNG, JPEG, or WebP in-browser, then plug into `og:image` and `twitter:image` tags without waiting for design handoffs.
              </p>
            </article>
            <article className="p-5 rounded-xl border border-zinc-800 bg-zinc-950">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                <Sparkle size={18} className="text-zinc-200" />
              </div>
              <h3 className="text-base font-semibold mb-2">Higher social click potential</h3>
              <p className="text-sm text-zinc-400">
                Better headline hierarchy, contrast, and template consistency improve preview quality and can increase social CTR for launches and blog posts.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-[#0a0a0a]" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
              How it works
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto tracking-[-0.03em]">
              Just three simple steps to beautiful metadata.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                <SquaresFour size={28} className="text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Pick a template</h3>
              <p className="text-zinc-400 tracking-tight text-sm">Browse our carefully curated gallery of designs tailored for high CTR.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                <TextAa size={28} className="text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Adjust the content</h3>
              <p className="text-zinc-400 tracking-tight text-sm">Add your copy, change the badge, upload your company logo seamlessly.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                <Download size={28} weight="bold" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Download</h3>
              <p className="text-zinc-400 tracking-tight text-sm">Grab your PNG or JPG file instantly. Attach it to your head tags and you run!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0a0a0a] border-t border-zinc-900/80">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-3">Changelog</p>
              <h2 className={`text-3xl md:text-5xl font-bold ${GeistPixelSquare.className} tracking-[-0.05em]`}>
                Latest Updates
              </h2>
              <p className="text-zinc-400 mt-4 max-w-2xl">
                Shipped changes grouped the way release notes should read: what&apos;s new, what improved, and what got fixed.
              </p>
            </div>
            <Link href="/changelog" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              View full changelog
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {latestChangelogEntries.map((entry) => (
              <article key={entry.version} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-lg font-semibold">{entry.version}</p>
                    <p className="text-sm text-zinc-500 mt-1">{entry.summary}</p>
                  </div>
                  <p className="text-xs text-zinc-500 whitespace-nowrap">{entry.date}</p>
                </div>

                <div className="space-y-5">
                  {entry.groups.map((group) => (
                    <section key={`${entry.version}-${group.label}`}>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">
                        {group.label}
                      </h3>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {group.items.map((item) => (
                          <li key={item} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold mb-12 text-center ${GeistPixelSquare.className} tracking-[-0.05em]`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-zinc-800 rounded-lg bg-zinc-950 overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-medium tracking-tight hover:bg-zinc-900 transition-colors"
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
                      <div className="px-6 pb-4 pt-2 text-zinc-400 text-sm leading-relaxed">
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

      {/* CTA */}
      <section className="px-6 pb-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold">Ready to publish your next OG image?</p>
              <p className="text-sm text-zinc-400 mt-1">Open the gallery, pick a template, and export in under 60 seconds.</p>
            </div>
            <Link
              href="/template-gallery"
              className="h-10 px-5 rounded-lg bg-zinc-100 text-black text-sm font-semibold hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
            >
              Open Template Gallery
              <Export size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] pt-10 pb-10 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-zinc-500">© 2026 ogimg.in. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/changelog" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Changelog
            </Link>
            <a href="#" aria-label="X" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              <XLogo size={20} />
            </a>
            <a href="#" aria-label="GitHub" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              <GithubLogo size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
