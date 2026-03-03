<p align="center">
  <img src="./public/ogimg.png" alt="ogimg.in logo" width="96" height="96" />
</p>

<h1 align="center">ogimg.in</h1>

<p align="center">
  Generate beautiful Open Graph images in your browser.
</p>

<p align="center">
  A fast, template-driven OG image generator built with Next.js.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-ff66cc?logo=framer&logoColor=white" alt="Framer Motion 12" />
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License" /></a>
</p>



## About
`ogimg.in` helps you generate social preview images (Open Graph / Twitter) quickly without opening a design tool.

The app gives you curated templates, inline editing, and instant export-ready visuals so you can ship links with strong previews faster.

## Why This Exists
- Social previews heavily impact CTR and first impression.
- Designers should not be a bottleneck for every new page/post.
- Teams need consistency across docs, launches, changelogs, and blog articles.

## Features
- Curated template gallery optimized for OG dimensions
- Browser-based editing workflow
- One-click export flow for social cards
- Scroll showcase section for output presentation
- Responsive landing page and editor experience
- Zero backend dependency for core visual editing flow

## Output Previews
<p align="center">
  <img src="./public/ogimg-og.png" alt="ogimg hero preview" width="900" />
</p>

<table align="center">
  <tr>
    <td><img src="./public/1.webp" alt="output 1" width="280" /></td>
    <td><img src="./public/2.webp" alt="output 2" width="280" /></td>
    <td><img src="./public/3.webp" alt="output 3" width="280" /></td>
  </tr>
  <tr>
    <td><img src="./public/4.webp" alt="output 4" width="280" /></td>
    <td><img src="./public/5.webp" alt="output 5" width="280" /></td>
    <td><img src="./public/6.webp" alt="output 6" width="280" /></td>
  </tr>
  <tr>
    <td><img src="./public/7.webp" alt="output 7" width="280" /></td>
    <td><img src="./public/8.webp" alt="output 8" width="280" /></td>
    <td><img src="./public/9.webp" alt="output 9" width="280" /></td>
  </tr>
</table>

## Use Cases
- Blog post OG images
- Product launch link previews
- Changelog and release announcement cards
- Docs and developer tooling pages
- Portfolio/project social cards

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Phosphor Icons

## Getting Started
```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Structure
```text
app/
  components/
  editor/[templateId]/
  template-gallery/
  page.tsx
public/
  1.webp ... 9.webp
  ogimg.png
```

## Scripts
- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - run production build locally
- `npm run lint` - run ESLint

## Contributing
Issues and pull requests are welcome. For larger changes, open an issue first with scope and screenshots.

## License
Licensed under the [MIT License](./LICENSE).
