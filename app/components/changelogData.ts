export type ChangelogGroup = {
    label: "New" | "Improved" | "Fixed";
    items: string[];
};

export type ChangelogEntry = {
    version: string;
    date: string;
    summary: string;
    groups: ChangelogGroup[];
};

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
    {
        version: "v1.5.0",
        date: "March 11, 2026",
        summary: "Preset expansion and changelog refresh.",
        groups: [
            {
                label: "New",
                items: [
                    "Added a dedicated changelog preview section to the landing page.",
                    "Added many more gradient, solid color, and background presets in the editor.",
                    "Added patterned background presets such as Topographic, Checker Depth, Prism Facets, Ripple Rings, and Folded Paper.",
                ],
            },
            {
                label: "Improved",
                items: [
                    "Updated changelog entries to use grouped release-note formatting instead of a flat bullet list.",
                    "Expanded background preset variety beyond mesh glows to include more structural patterns.",
                ],
            },
            {
                label: "Fixed",
                items: [
                    "Removed redundant background presets that overlapped with the existing grid, graph, and dots overlay controls.",
                ],
            },
        ],
    },
    {
        version: "v1.4.0",
        date: "March 3, 2026",
        summary: "Editor flow and export reliability update.",
        groups: [
            {
                label: "New",
                items: [
                    "Added dedicated route flow from landing page to template gallery to editor.",
                    "Added expanded typography controls with curated font selection in the editor.",
                ],
            },
            {
                label: "Improved",
                items: [
                    "Improved the local-safe export pipeline for more reliable PNG and JPEG output.",
                ],
            },
            {
                label: "Fixed",
                items: [
                    "Fixed a few export edge cases by tightening the render and asset inlining path.",
                ],
            },
        ],
    },
    {
        version: "v1.3.0",
        date: "March 2, 2026",
        summary: "Template and export expansion.",
        groups: [
            {
                label: "New",
                items: [
                    "Added new OG templates including Podcast Cover and Changelog layouts.",
                    "Added multi-format export support for PNG, JPEG, and WebP.",
                ],
            },
            {
                label: "Improved",
                items: [
                    "Improved background controls with grid, graph, and dots overlays.",
                    "Improved template customization inputs for faster editing.",
                    "Improved template preview scaling behavior across screen sizes.",
                ],
            },
            {
                label: "Fixed",
                items: [
                    "Fixed several spacing and visual polish issues across the landing experience.",
                ],
            },
        ],
    },
];
