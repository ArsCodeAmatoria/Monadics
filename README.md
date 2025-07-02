# Monadics

<div align="center">

![Image](https://github.com/user-attachments/assets/9c17484b-abb7-4b10-8481-c5d0ccd76e89)

## A Cerebral Exploration of Quantum Consciousness and Monadic Computation

*Where minds meet mathematics at the intersection of reality and code*

[![Next.js](https://img.shields.io/badge/Next.js-14.2.30-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MDX](https://img.shields.io/badge/MDX-2.3+-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)](https://mdxjs.com/)

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Educational-purple?style=for-the-badge)](LICENSE)
[![RSS Feed](https://img.shields.io/badge/RSS-Feed_Available-FFA500?style=for-the-badge&logo=rss&logoColor=white)](https://monadics.vercel.app/rss.xml)

</div>

---

## Overview

A sophisticated blog platform exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation. Built for minds operating at the intersection of mathematics, metaphysics, and computational theory.

## Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **MDX Blog Posts**: Static content with frontmatter support
- **Mathematical Rendering**: KaTeX integration for LaTeX equations
- **Syntax Highlighting**: Dracula-themed code blocks for Haskell, Rust, Python
- **Dark Mode**: Quantum purple accent colors with dark theme by default
- **Responsive Design**: Mobile-first, clean typography with IBM Plex Serif
- **Search & Filtering**: Tag-based filtering and content search
- **RSS Feed**: Automatic RSS generation for blog posts
- **SEO Optimized**: Open Graph tags, structured metadata

## Design Philosophy

- **Typography**: Clean, readable columns with IBM Plex Serif for body text and Inter for headings
- **Color Scheme**: Monochrome base with quantum-accent purples (`hsl(262 83% 58%)`)
- **Layout**: Inspired by Wired magazine but more academic in nature
- **Content**: Focus on rigorous mathematical treatment alongside practical code examples

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd monadics

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the blog.

### Creating Blog Posts

1. Create a new `.mdx` file in the `posts/` directory
2. Add frontmatter with required fields:

```mdx
---
title: "Your Article Title"
author: "LUCI"
date: "2025-01-01"
tags: ["Tag1", "Tag2", "Tag3"]
---

# Your Article Title

Your content here with full MDX support, including:

- KaTeX math: $$E = mc^2$$
- Code blocks with syntax highlighting
- Standard Markdown formatting
```

## Project Structure

```
src/
├── app/                 # Next.js 14 app router
│   ├── [slug]/         # Dynamic blog post routes
│   ├── about/          # About page
│   ├── rss.xml/        # RSS feed endpoint
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── home-page.tsx  # Client-side homepage
│   ├── layout.tsx     # Main layout component
│   ├── mdx-provider.tsx # MDX components
│   ├── post-card.tsx  # Blog post preview cards
│   └── theme-*.tsx    # Theme components
├── lib/               # Utilities
│   ├── blog.ts        # Blog post utilities
│   ├── rss.ts         # RSS feed generation
│   └── utils.ts       # Common utilities
└── styles/
    └── globals.css    # Global styles with custom properties

posts/                 # Blog post content
├── quantum-superposition-and-monads.mdx
└── [other-posts].mdx
```

## Core Technologies

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom quantum color palette
- **UI Components**: shadcn/ui component library
- **Content**: MDX with gray-matter for frontmatter parsing
- **Math Rendering**: KaTeX via remark-math and rehype-katex
- **Code Highlighting**: react-syntax-highlighter with Prism and Dracula theme
- **Dark Mode**: next-themes for theme switching
- **Icons**: Lucide React

## Content Themes

- **Quantum Consciousness**: Exploring Orch-OR theory and quantum mind models
- **Mathematical Formalisms**: Category theory, linear algebra, differential geometry
- **Monadic Computation**: Haskell implementations and functional programming
- **Computational Philosophy**: Information processing and mind-as-computation

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Export static site (if needed)
npm run build && npx next export
```

## Contributing

This is a personal blog project, but suggestions and discussions about the content are welcome through issues.

## License

Content and code are provided for educational and research purposes. Please respect the intellectual property of the mathematical and philosophical concepts discussed.

---

*"I am the monad computing reality through quantum superposition until the moment of conscious observation collapses the wave function into experience."*

— **LUCI, Monadic Mind**
