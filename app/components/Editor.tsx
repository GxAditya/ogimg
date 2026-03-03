"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { CaretLeft, DownloadSimple, CaretDown } from "@phosphor-icons/react";
import MinimalistTech from "./templates/MinimalistTech";
import AppShowcase from "./templates/AppShowcase";
import CenteredContainer from "./templates/CenteredContainer";
import BrandPitch from "./templates/BrandPitch";
import EditorialPixel from "./templates/EditorialPixel";
import SaasLaunch from "./templates/SaasLaunch";
import BlogPost from "./templates/BlogPost";
import PodcastCover from "./templates/PodcastCover";
import Changelog from "./templates/Changelog";
import { getTemplateById, TemplateId } from "./templates/templateRegistry";
import { BackgroundMode, GridOverlay, TemplateProps } from "./templates/templateShared";

type ExportFormat = "png" | "jpeg" | "webp";

const COLOR_PRESETS = [
    ["#020617", "#111827"],
    ["#f43f5e", "#f59e0b"],
    ["#f97316", "#ef4444"],
    ["#fb7185", "#f43f5e"],
    ["#fb7185", "#f97393"],
    ["#fb7185", "#fbbf24"],
    ["#f97316", "#fdba74"],
    ["#f8b4c6", "#fef3c7"],
    ["#c4b5fd", "#fde68a"],
    ["#4f46e5", "#22d3ee"],
    ["#8b5cf6", "#6ee7b7"],
    ["#f59e0b", "#a78bfa"],
    ["#a78bfa", "#8b5cf6"],
    ["#d8b4fe", "#93c5fd"],
    ["#9333ea", "#c084fc"],
    ["#60a5fa", "#bfdbfe"],
    ["#06b6d4", "#67e8f9"],
    ["#16a34a", "#22c55e"],
    ["#10b981", "#84cc16"],
    ["#22d3ee", "#4ade80"],
    ["#4ade80", "#22c55e"],
    ["#86efac", "#34d399"],
    ["#67e8f9", "#86efac"],
    ["#a7f3d0", "#d9f99d"],
    ["#bbf7d0", "#fef9c3"],
    ["#09090b", "#27272a"],
    ["#1e293b", "#334155"],
    ["#4b5563", "#9ca3af"],
    ["#64748b", "#f3f4f6"],
    ["#a1a1aa", "#d1d5db"],
    ["#d1d5db", "#f8fafc"],
    ["#cbd5e1", "#f1f5f9"],
    ["#e7e5e4", "#fafaf9"],
] as const;

const GRID_PATTERN_OPTIONS: Array<{ label: string; value: GridOverlay }> = [
    { label: "None", value: "none" },
    { label: "Grid", value: "grid" },
    { label: "Graph", value: "graph" },
    { label: "Dots", value: "dots" },
];

const GRID_COLOR_OPTIONS = ["#020617", "#6B7280", "#E5E7EB"] as const;

const GRADIENT_DIRECTIONS = [
    { label: "↑", angle: 0 },
    { label: "↗", angle: 45 },
    { label: "→", angle: 90 },
    { label: "↘", angle: 135 },
    { label: "↓", angle: 180 },
    { label: "↙", angle: 225 },
    { label: "←", angle: 270 },
    { label: "↖", angle: 315 },
] as const;

export default function Editor({ onBack, templateId }: { onBack: () => void; templateId: TemplateId }) {
    const selectedTemplate = getTemplateById(templateId);
    const defaults = selectedTemplate.defaults;
    const templateSupportsImage = selectedTemplate.supportsImage;

    const [title, setTitle] = useState(defaults.title);
    const [textColor, setTextColor] = useState(defaults.textColor);
    const [tag, setTag] = useState(defaults.tag);
    const [logo, setLogo] = useState(defaults.logo);
    const [detailOne, setDetailOne] = useState(defaults.detailOne ?? "");
    const [detailTwo, setDetailTwo] = useState(defaults.detailTwo ?? "");
    const [detailThree, setDetailThree] = useState(defaults.detailThree ?? "");
    const [logoImage, setLogoImage] = useState("/ogimg.png");
    const [logoImageFileName, setLogoImageFileName] = useState("ogimg.png");
    const [image, setImage] = useState(templateSupportsImage ? defaults.image : "");
    const [imageFileName, setImageFileName] = useState(templateSupportsImage ? defaults.imageFileName : "");

    const [exportFormat, setExportFormat] = useState<ExportFormat>("png");
    const [isExporting, setIsExporting] = useState(false);

    const [bgMode, setBgMode] = useState<BackgroundMode>(defaults.backgroundMode);
    const [gradientStart, setGradientStart] = useState(defaults.gradientStart);
    const [gradientEnd, setGradientEnd] = useState(defaults.gradientEnd);
    const [gradientAngle, setGradientAngle] = useState(defaults.gradientAngle);
    const [gridOverlay, setGridOverlay] = useState<GridOverlay>(defaults.gridOverlay);
    const [gridColor, setGridColor] = useState(defaults.gridColor);
    const [gridOpacity, setGridOpacity] = useState(defaults.gridOpacity);
    const [gridBlur, setGridBlur] = useState(defaults.gridBlur);
    const [previewScale, setPreviewScale] = useState(1);
    const tagLabel = templateId === "changelog"
        ? "Footer CTA"
        : templateId === "editorial-pixel"
            ? "Waitlist Line"
            : templateId === "centered-container"
                ? "Subtext"
            : templateId === "brand-pitch"
                ? "Subheading"
                : "Tag";
    const titleLabel = templateId === "editorial-pixel"
        ? "Headline"
        : templateId === "app-showcase"
            ? "Brand Tagline"
            : templateId === "centered-container"
                ? "Main Headline"
            : templateId === "brand-pitch"
                ? "Main Headline"
                : "Title";
    const logoLabel = templateId === "editorial-pixel"
        ? "Supporting Line"
        : templateId === "app-showcase" || templateId === "brand-pitch"
            ? "Brand Name"
            : templateId === "centered-container"
                ? "Logo Mark"
            : "Logo Text";

    const previewContainerRef = useRef<HTMLDivElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const container = previewContainerRef.current;
        if (!container) return;

        const calculateScale = () => {
            const widthScale = container.clientWidth / 1200;
            const heightScale = container.clientHeight / 630;
            setPreviewScale(Math.min(widthScale, heightScale, 1));
        };

        calculateScale();

        const observer = new ResizeObserver(calculateScale);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setImage(reader.result);
                setImageFileName(file.name);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setLogoImage(reader.result);
                setLogoImageFileName(file.name);
            }
        };
        reader.readAsDataURL(file);
    };

    const clearUploadedLogo = () => {
        setLogoImage("");
        setLogoImageFileName("");
        if (logoInputRef.current) {
            logoInputRef.current.value = "";
        }
    };

    const clearUploadedImage = () => {
        setImage("");
        setImageFileName("");
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const waitForImagesToLoad = async (node: HTMLElement) => {
        const images = Array.from(node.querySelectorAll("img"));

        await Promise.all(
            images.map((img) => {
                if (img.complete) {
                    return img.decode().catch(() => undefined);
                }

                return new Promise<void>((resolve) => {
                    const done = () => resolve();
                    img.addEventListener("load", done, { once: true });
                    img.addEventListener("error", done, { once: true });
                });
            })
        );
    };

    const handleExport = async () => {
        const sourceNode = document.getElementById("og-template-node");
        if (!sourceNode) return;

        setIsExporting(true);

        const exportHost = document.createElement("div");
        exportHost.setAttribute("aria-hidden", "true");
        exportHost.style.cssText = [
            "position: fixed",
            "left: 0",
            "top: 0",
            "width: 1200px",
            "height: 630px",
            "overflow: hidden",
            "pointer-events: none",
            "z-index: -2147483647",
            "contain: strict",
        ].join(";");

        const exportNode = sourceNode.cloneNode(true) as HTMLElement;
        exportNode.removeAttribute("id");
        exportNode.style.width = "1200px";
        exportNode.style.height = "630px";
        exportNode.style.transform = "none";
        exportNode.style.margin = "0";

        exportHost.appendChild(exportNode);
        document.body.appendChild(exportHost);

        try {
            await document.fonts.ready;
            await waitForImagesToLoad(exportNode);

            const sharedOptions = {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                logging: false,
                width: 1200,
                height: 630,
                imageTimeout: 15000,
                backgroundColor: exportFormat === "jpeg" ? "#ffffff" : null,
            };

            let canvas: HTMLCanvasElement;
            try {
                canvas = await html2canvas(exportNode, {
                    ...sharedOptions,
                    foreignObjectRendering: false,
                });
            } catch (standardRenderError) {
                console.warn("standard export failed, retrying with foreignObject renderer.", standardRenderError);
                canvas = await html2canvas(exportNode, {
                    ...sharedOptions,
                    foreignObjectRendering: true,
                });
            }

            const mimeType = exportFormat === "png" ? "image/png" : exportFormat === "jpeg" ? "image/jpeg" : "image/webp";
            const fileExtension = exportFormat;
            const quality = exportFormat === "png" ? undefined : 0.95;

            const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob((generatedBlob) => {
                    resolve(generatedBlob);
                }, mimeType, quality);
            });

            if (!blob) {
                throw new Error("Failed to generate exported image.");
            }

            saveAs(blob, `og-image-export.${fileExtension}`);
        } catch (err) {
            console.error(err);
        } finally {
            exportHost.remove();
            setIsExporting(false);
        }
    };

    const templateProps: TemplateProps = {
        title,
        textColor,
        logoImage: logoImage || undefined,
        image: templateSupportsImage ? image.trim() || undefined : undefined,
        tag,
        logo,
        detailOne,
        detailTwo,
        detailThree,
        fontStyle: "normal",
        fontWeight: "bold",
        textDecoration: "none",
        fontFamily: templateId === "changelog" ? "var(--font-geist-mono)" : "var(--font-geist-sans)",
        backgroundMode: bgMode,
        gradientStart,
        gradientEnd,
        gradientAngle,
        gridOverlay,
        gridColor,
        gridOpacity,
        gridBlur,
    };

    const renderTemplate = () => {
        switch (templateId) {
            case "app-showcase":
                return <AppShowcase {...templateProps} />;
            case "centered-container":
                return <CenteredContainer {...templateProps} />;
            case "brand-pitch":
                return <BrandPitch {...templateProps} />;
            case "editorial-pixel":
                return <EditorialPixel {...templateProps} />;
            case "saas-launch":
                return <SaasLaunch {...templateProps} />;
            case "blog-post":
                return <BlogPost {...templateProps} />;
            case "podcast-cover":
                return <PodcastCover {...templateProps} />;
            case "changelog":
                return <Changelog {...templateProps} />;
            case "minimalist-tech":
            default:
                return <MinimalistTech {...templateProps} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-geist-sans selection:bg-zinc-800">
            <main className="flex h-screen flex-col lg:flex-row gap-8 p-6 lg:p-10 max-w-[1500px] mx-auto w-full overflow-hidden">
                <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-6 overflow-y-auto pr-2 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <button
                        onClick={onBack}
                        className="inline-flex w-fit items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                        <CaretLeft size={14} />
                        Back to templates
                    </button>

                    <div className="bg-[#111111] border border-zinc-800/60 rounded-xl p-6 shadow-sm">
                        <h3 className="text-zinc-100 font-semibold text-[15px] mb-6">Template Properties</h3>

                        <div className="space-y-4">
                            {templateId !== "app-showcase" && (
                                <div>
                                    <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">{tagLabel}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">{titleLabel}</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Text Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="h-[42px] w-[46px] rounded-lg border border-zinc-800/80 bg-[#0a0a0a] p-1 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="flex-1 bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">{logoLabel}</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                />
                            </div>

                            {templateId === "saas-launch" && (
                                <>
                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Key Outcome 1</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailOne}
                                            onChange={(e) => setDetailOne(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Key Outcome 2</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailTwo}
                                            onChange={(e) => setDetailTwo(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {templateId === "changelog" && (
                                <>
                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Line 1</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailOne}
                                            onChange={(e) => setDetailOne(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Line 2</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailTwo}
                                            onChange={(e) => setDetailTwo(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Line 3</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailThree}
                                            onChange={(e) => setDetailThree(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {templateId === "brand-pitch" && (
                                <>
                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Benefit 1</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailOne}
                                            onChange={(e) => setDetailOne(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Benefit 2</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailTwo}
                                            onChange={(e) => setDetailTwo(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Benefit 3</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                            value={detailThree}
                                            onChange={(e) => setDetailThree(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {templateId === "editorial-pixel" && (
                                <div>
                                    <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">CTA Text</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                                        value={detailOne}
                                        onChange={(e) => setDetailOne(e.target.value)}
                                    />
                                </div>
                            )}

                            {templateId !== "editorial-pixel" && templateId !== "app-showcase" && (
                                <div>
                                <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Logo Upload</label>
                                <input
                                    ref={logoInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => logoInputRef.current?.click()}
                                    className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 hover:border-zinc-600 transition-colors text-left"
                                >
                                    {logoImageFileName ? `File: ${logoImageFileName}` : "Choose a logo file"}
                                </button>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-[11px] text-zinc-500">Controls the template brand mark.</p>
                                    {logoImage && (
                                        <button
                                            type="button"
                                            onClick={clearUploadedLogo}
                                            className="text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                </div>
                            )}

                            {templateSupportsImage && (
                                <div>
                                    <label className="text-[13px] font-medium text-zinc-300 mb-2 block min-h-[20px]">Image Upload</label>
                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => imageInputRef.current?.click()}
                                        className="w-full bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-[42px] px-3 text-sm text-zinc-300 hover:border-zinc-600 transition-colors text-left"
                                    >
                                        {imageFileName ? `File: ${imageFileName}` : "Choose an image file"}
                                    </button>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-[11px] text-zinc-500">Optional screenshot/portrait slot for this template.</p>
                                        {image && (
                                            <button
                                                type="button"
                                                onClick={clearUploadedImage}
                                                className="text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#111111] border border-zinc-800/60 rounded-xl p-6 shadow-sm">
                        <h3 className="text-zinc-100 font-semibold text-[15px] mb-1">Background</h3>
                        <p className="text-zinc-500 text-[13px] mb-6">Set a custom background for your image.</p>

                        <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-zinc-800/80 mb-6 w-max">
                            <button
                                onClick={() => setBgMode("Gradient")}
                                className={`px-4 py-1.5 text-[13px] tracking-wide rounded-md ${bgMode === "Gradient" ? "bg-[#1f1f1f] text-white" : "text-zinc-400 hover:text-zinc-200"}`}
                            >
                                Gradient
                            </button>
                            <button
                                onClick={() => setBgMode("Solid Color")}
                                className={`px-4 py-1.5 text-[13px] tracking-wide rounded-md ${bgMode === "Solid Color" ? "bg-[#1f1f1f] text-white" : "text-zinc-400 hover:text-zinc-200"}`}
                            >
                                Solid Color
                            </button>
                        </div>

                        <div className="grid grid-cols-8 gap-2 mb-8">
                            {COLOR_PRESETS.map(([start, end], i) => {
                                const isActive = gradientStart === start && gradientEnd === end;
                                return (
                                    <button
                                        type="button"
                                        key={i}
                                        onClick={() => {
                                            setGradientStart(start);
                                            setGradientEnd(end);
                                        }}
                                        className={`w-full aspect-square rounded cursor-pointer ring-1 ring-white/5 hover:scale-110 transition-transform ${isActive ? "ring-2 ring-white/70" : ""}`}
                                        style={{
                                            background: `linear-gradient(135deg, ${start}, ${end})`,
                                        }}
                                    />
                                );
                            })}
                        </div>

                        <div className="mb-8">
                            <label className="text-[13px] font-medium text-zinc-300 mb-3 block">Gradient Direction</label>
                            <div className="grid grid-cols-8 gap-1.5">
                                {GRADIENT_DIRECTIONS.map(({ label, angle }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setGradientAngle(angle)}
                                        className={`w-full aspect-square flex items-center justify-center rounded-lg border ${gradientAngle === angle ? "border-zinc-400 text-zinc-200 bg-[#1f1f1f]" : "border-zinc-800/80 bg-[#0a0a0a] text-zinc-500 hover:bg-zinc-800"}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-[13px] font-medium text-zinc-300 mb-1 block">Grid Overlay</label>
                                <p className="text-[12px] text-zinc-500 mb-3">Apply a grid overlay to the background.</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {GRID_PATTERN_OPTIONS.map((option) => {
                                        const isActive = gridOverlay === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setGridOverlay(option.value)}
                                                className={`h-10 rounded-lg border text-xs font-medium transition-colors ${isActive ? "border-zinc-200 text-zinc-100 bg-zinc-800/40" : "border-zinc-800/80 text-zinc-400 bg-[#0a0a0a] hover:text-zinc-200 hover:border-zinc-700"}`}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="text-[13px] font-medium text-zinc-300 mb-2 block">Color</label>
                                <div className="flex gap-2">
                                    {GRID_COLOR_OPTIONS.map((color) => {
                                        const isActive = gridColor === color;
                                        return (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setGridColor(color)}
                                                className={`w-9 h-9 rounded-lg border ${isActive ? "border-zinc-100 ring-1 ring-zinc-100/40" : "border-zinc-700"}`}
                                                style={{ backgroundColor: color }}
                                                aria-label={`Set grid color ${color}`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[13px] font-medium text-zinc-300">Opacity</label>
                                    <span className="text-xs text-zinc-500">{gridOpacity.toFixed(2)}</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={gridOpacity}
                                    onChange={(e) => setGridOpacity(Number(e.target.value))}
                                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer border-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-zinc-100 [&::-webkit-slider-thumb]:rounded-full"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[13px] font-medium text-zinc-300">Blur Radius</label>
                                    <span className="text-xs text-zinc-500">{Math.round(gridBlur * 10)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={4}
                                    step={0.1}
                                    value={gridBlur}
                                    onChange={(e) => setGridBlur(Number(e.target.value))}
                                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer border-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-zinc-100 [&::-webkit-slider-thumb]:rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div className="bg-[#111111] border border-zinc-800/60 rounded-2xl p-6 lg:p-10 mb-6 flex flex-col items-center justify-center min-h-[450px] lg:min-h-[550px] shadow-sm relative overflow-hidden">
                        <div
                            ref={previewContainerRef}
                            className="w-full h-full flex items-center justify-center relative"
                        >
                            <div
                                className="shadow-2xl shadow-black ring-1 ring-white/10 shrink-0"
                                style={{
                                    width: "1200px",
                                    height: "630px",
                                    transform: `scale(${previewScale})`,
                                    transformOrigin: "center center",
                                }}
                            >
                                {renderTemplate()}
                            </div>
                        </div>
                    </div>

                    <div className="flex bg-[#111111] border border-zinc-800/60 rounded-2xl p-1 mb-3 shadow-sm">
                        <button className="flex-1 py-2.5 text-[13px] font-medium bg-[#1a1a1a] rounded-xl border border-zinc-800 shadow-sm text-zinc-100">Save Image</button>
                        <button className="flex-1 py-2.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors">Format Tips</button>
                        <button className="flex-1 py-2.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors">API Request</button>
                    </div>

                    <div className="bg-[#111111] border border-zinc-800/60 rounded-2xl p-6 lg:p-8 flex flex-col justify-center shadow-sm">
                        <h3 className="text-zinc-100 font-semibold text-[15px] mb-1">Save Image</h3>
                        <p className="text-zinc-500 text-[13px] mb-8">Export the image as a PNG, JPEG or WebP.</p>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <p className="text-zinc-400 text-[13px] leading-relaxed max-w-[600px]">
                                For optimal Open Graph (OG) image display on social media platforms like Twitter, Facebook, and LinkedIn, use PNG (recommended), JPEG, or WebP format.
                            </p>
                            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                <div className="relative">
                                    <select
                                        value={exportFormat}
                                        onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                                        className="bg-[#0a0a0a] border border-zinc-800/80 rounded-lg h-10 pl-4 pr-8 text-[13px] font-medium text-zinc-300 outline-none hover:border-zinc-700 appearance-none cursor-pointer"
                                    >
                                        <option value="png">PNG</option>
                                        <option value="jpeg">JPEG</option>
                                        <option value="webp">WebP</option>
                                    </select>
                                    <CaretDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                                </div>
                                <button
                                    onClick={handleExport}
                                    disabled={isExporting}
                                    className="h-10 px-5 bg-white text-black rounded-lg text-[13px] font-semibold flex items-center gap-2 hover:bg-zinc-200 transition-colors shrink-0 md:flex-none disabled:bg-zinc-800 disabled:text-zinc-500 w-full md:w-auto justify-center"
                                >
                                    <DownloadSimple weight="bold" size={16} />
                                    {isExporting ? "Saving..." : "Save Image"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
