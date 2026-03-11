# ogimg.in Feature Plan

This plan focuses on features that compound the value of the current product: faster reuse, better output control, and ways to scale beyond one-off manual image creation.

## Priorities

### 1. Saved Projects and Draft Recovery
- Let users save work-in-progress cards locally first, then optionally sync later.
- Persist template choice, text, uploads, font, background, and export settings.
- Add duplicate, rename, and recent-project actions.

Why this matters:
- The current editor is strong for single-session work, but repeat usage gets expensive if users rebuild similar cards from scratch.

### 2. Brand Kits
- Save reusable brand presets with logo, text colors, preferred fonts, and default backgrounds.
- Allow one-click apply across any template.
- Support multiple kits for agencies or teams.

Why this matters:
- This turns the app from a template picker into a repeatable publishing tool.

### 3. Custom Dimensions and Platform Presets
- Add size presets for Open Graph, X, LinkedIn, Product Hunt, YouTube thumbnails, and square social posts.
- Let users enter custom width and height.
- Preview crop-safe areas for different platforms.

Why this matters:
- Right now the app is optimized for OG only. Expanding dimensions increases utility without changing the core workflow.

### 4. Template Variables and Smart Layout Rules
- Add field schemas per template instead of ad hoc inputs.
- Support optional sections, dynamic line clamping, auto-resize rules, and hide-empty blocks.
- Prevent broken layouts when copy is too long.

Why this matters:
- This reduces maintenance cost as more templates are added and makes the editor more reliable.

### 5. Social Preview Simulator
- Show how the exported image looks in X, LinkedIn, Discord, and Slack-style preview cards.
- Include title/description/url metadata preview beside the image.

Why this matters:
- Users care about the final shared result, not just the raw asset.

## Next Wave

### 6. AI Copy Helpers
- Generate headline variants, subtitle options, CTA lines, and changelog bullets.
- Add tone presets such as launch, docs, blog, and changelog.
- Keep it optional and fast, not a mandatory workflow.

### 7. Bulk Generation
- Generate many images from CSV or JSON input.
- Map columns to template fields.
- Export as a zip.

Why this matters:
- This unlocks programmatic SEO, blog cover generation, changelog archives, and campaign batches.

### 8. Shareable Editor State
- Encode projects in the URL or exported config JSON.
- Let users send editable links instead of only final images.

### 9. Background Asset Packs
- Expand beyond gradients into curated shape systems, editorial textures, paper cuts, glass, noise, and abstract scene presets.
- Group them by style family and search tag.

### 10. Upload and Asset Library
- Reuse previously uploaded logos and screenshots inside the session.
- Add drag-and-drop and image replacement flows.

## Bigger Bets

### 11. API / Headless Rendering
- Accept template id plus JSON payload and return rendered image.
- Keep browser editor and API templates aligned.

Why this matters:
- This turns the app into infrastructure for docs, CMS pipelines, and product launch systems.

### 12. Team Workspaces
- Shared brand kits, shared templates, approval flow, and activity history.
- Useful only after saved projects and sync exist.

### 13. Template Marketplace or Community Packs
- Let users publish and install template packs.
- Curated moderation would matter here.

## Suggested Build Order

1. Saved Projects and Draft Recovery
2. Brand Kits
3. Custom Dimensions and Platform Presets
4. Template Variables and Smart Layout Rules
5. Social Preview Simulator
6. Bulk Generation
7. Shareable Editor State
8. API / Headless Rendering

## Notes for Implementation

- Keep the current no-backend editing flow as the default path.
- Prefer schema-driven template configuration over more `templateId === ...` conditionals in the editor.
- If persistence is added, start with local storage or IndexedDB before adding accounts.
- If API rendering is added, make export parity a hard requirement so browser and server output do not drift.
