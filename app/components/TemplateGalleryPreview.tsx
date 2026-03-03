"use client";

import { useEffect, useRef, useState } from "react";
import { TemplateId, getTemplateById } from "./templates/templateRegistry";
import MinimalistTech from "./templates/MinimalistTech";
import AppShowcase from "./templates/AppShowcase";
import CenteredContainer from "./templates/CenteredContainer";
import BrandPitch from "./templates/BrandPitch";
import EditorialPixel from "./templates/EditorialPixel";
import SaasLaunch from "./templates/SaasLaunch";
import BlogPost from "./templates/BlogPost";
import PodcastCover from "./templates/PodcastCover";
import Changelog from "./templates/Changelog";
import type { TemplateProps } from "./templates/templateShared";
import { getTemplateDefaultFontId, getTemplateFontFamily } from "./templates/fontCatalog";

export default function TemplateGalleryPreview({
    templateId,
}: {
    templateId: TemplateId;
}) {
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const [previewScale, setPreviewScale] = useState(1);
    const template = getTemplateById(templateId);
    const defaults = template.defaults;

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

    const templateProps: TemplateProps = {
        title: defaults.title,
        textColor: defaults.textColor,
        logoImage: "/ogimg.png",
        image: template.supportsImage ? defaults.image || undefined : undefined,
        tag: defaults.tag,
        logo: defaults.logo,
        detailOne: defaults.detailOne,
        detailTwo: defaults.detailTwo,
        detailThree: defaults.detailThree,
        fontStyle: "normal",
        fontWeight: "bold",
        textDecoration: "none",
        fontFamily: getTemplateFontFamily(getTemplateDefaultFontId(templateId)),
        backgroundMode: defaults.backgroundMode,
        gradientStart: defaults.gradientStart,
        gradientEnd: defaults.gradientEnd,
        gradientAngle: defaults.gradientAngle,
        gridOverlay: defaults.gridOverlay,
        gridColor: defaults.gridColor,
        gridOpacity: defaults.gridOpacity,
        gridBlur: defaults.gridBlur,
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
        <div ref={previewContainerRef} className="aspect-1200/630 relative overflow-hidden flex items-center justify-center">
            <div
                className="shrink-0"
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
    );
}

