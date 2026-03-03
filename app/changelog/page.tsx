import Link from "next/link";
import Image from "next/image";
import { GeistPixelSquare } from "geist/font/pixel";

const CHANGELOG_ENTRIES = [
    {
        version: "v1.4.0",
        date: "March 3, 2026",
        updates: [
            "Added dedicated route flow: landing -> template gallery -> editor.",
            "Introduced local-safe export pipeline improvements for more reliable PNG/JPEG output.",
            "Expanded typography controls with curated font selection in editor.",
        ],
    },
    {
        version: "v1.3.0",
        date: "March 2, 2026",
        updates: [
            "Added new OG templates including Podcast Cover and Changelog layouts.",
            "Improved background controls with grid, graph, and dots overlays.",
            "Improved template customization inputs for faster editing.",
        ],
    },
    {
        version: "v1.2.0",
        date: "March 1, 2026",
        updates: [
            "Added multi-format export support (PNG, JPEG, WebP).",
            "Improved template preview scaling behavior across screen sizes.",
            "Refined visual styles and spacing across the landing experience.",
        ],
    },
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between gap-4 mb-12">
                    <div className="flex items-center gap-2">
                        <Image src="/ogimg.png" alt="ogimg logo" width={24} height={24} className="rounded-sm bg-white p-0.5" />
                        <span className={`text-xl ${GeistPixelSquare.className} tracking-[-0.05em]`}>ogimg.in</span>
                    </div>
                    <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
                        Back to Home
                    </Link>
                </div>

                <header className="mb-10">
                    <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${GeistPixelSquare.className} tracking-[-0.05em]`}>
                        Changelog
                    </h1>
                    <p className="text-zinc-400 max-w-2xl">
                        Product updates, improvements, and fixes shipped to ogimg.in.
                    </p>
                </header>

                <div className="space-y-5">
                    {CHANGELOG_ENTRIES.map((entry) => (
                        <article key={entry.version} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                                <h2 className="text-xl font-semibold">{entry.version}</h2>
                                <p className="text-sm text-zinc-500">{entry.date}</p>
                            </div>
                            <ul className="space-y-2 text-sm text-zinc-300">
                                {entry.updates.map((item) => (
                                    <li key={item} className="leading-relaxed">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

