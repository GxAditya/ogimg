import type { CSSProperties } from "react";

export type BackgroundMode = "Gradient" | "Solid Color";
export type GridOverlay = "none" | "grid" | "graph" | "dots";

export interface TemplateProps {
    title: string;
    textColor?: string;
    logoImage?: string;
    image?: string;
    tag?: string;
    logo?: string;
    detailOne?: string;
    detailTwo?: string;
    detailThree?: string;
    fontStyle: string;
    fontWeight: string;
    textDecoration: string;
    fontFamily: string;
    backgroundMode?: BackgroundMode;
    gradientStart?: string;
    gradientEnd?: string;
    gradientAngle?: number;
    gridOverlay?: GridOverlay;
    gridColor?: string;
    gridOpacity?: number;
    gridBlur?: number;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

export const hexToRgba = (hexColor: string, alpha: number) => {
    const safeAlpha = clamp(alpha, 0, 1);
    let hex = hexColor.replace("#", "").trim();

    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((char) => `${char}${char}`)
            .join("");
    }

    if (hex.length !== 6) {
        return `rgba(255, 255, 255, ${safeAlpha})`;
    }

    const intValue = Number.parseInt(hex, 16);
    if (Number.isNaN(intValue)) {
        return `rgba(255, 255, 255, ${safeAlpha})`;
    }

    const r = (intValue >> 16) & 255;
    const g = (intValue >> 8) & 255;
    const b = intValue & 255;

    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
};

export const getBackgroundFill = (
    backgroundMode: BackgroundMode,
    gradientStart: string,
    gradientEnd: string,
    gradientAngle: number
) => {
    if (backgroundMode === "Solid Color") {
        return gradientStart;
    }

    return `linear-gradient(${gradientAngle}deg, ${gradientStart} 0%, ${gradientEnd} 100%)`;
};

export const getGridOverlayStyle = (
    gridOverlay: GridOverlay,
    gridColor: string,
    gridOpacity: number
): CSSProperties => {
    const clampedOpacity = clamp(gridOpacity, 0, 1);
    const overlayColor = hexToRgba(gridColor, clampedOpacity);
    const graphMinorColor = hexToRgba(gridColor, clampedOpacity * 0.35);
    const graphMajorColor = hexToRgba(gridColor, clampedOpacity);

    if (gridOverlay === "dots") {
        return {
            backgroundImage: `radial-gradient(circle, ${overlayColor} 1.2px, transparent 1.2px)`,
            backgroundSize: "16px 16px",
        };
    }

    if (gridOverlay === "graph") {
        return {
            backgroundImage: [
                `linear-gradient(${graphMinorColor} 1px, transparent 1px)`,
                `linear-gradient(90deg, ${graphMinorColor} 1px, transparent 1px)`,
                `linear-gradient(${graphMajorColor} 1px, transparent 1px)`,
                `linear-gradient(90deg, ${graphMajorColor} 1px, transparent 1px)`,
            ].join(","),
            backgroundSize: "16px 16px, 16px 16px, 80px 80px, 80px 80px",
        };
    }

    return {
        backgroundImage: [
            `linear-gradient(${overlayColor} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${overlayColor} 1px, transparent 1px)`,
        ].join(","),
        backgroundSize: "32px 32px, 32px 32px",
    };
};

export const getBrandMark = (logo = "", tag = "", fallback = "") => {
    const seed = (logo || tag).replace(/[^a-zA-Z0-9]/g, "").slice(0, 2);
    return (seed || fallback).toUpperCase();
};

export const resolveFontWeight = (fontWeight: string, emphasizedWeight = 700) => {
    if (fontWeight === "normal") {
        return 400;
    }

    if (fontWeight === "bold") {
        return emphasizedWeight;
    }

    return emphasizedWeight;
};

export const clampGridBlur = (gridBlur: number) => clamp(gridBlur, 0, 8);
