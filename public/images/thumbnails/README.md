# Thumbnail Images

This folder contains thumbnail images for blog posts displayed on the homepage.

## Usage

1. **Add images**: Place your thumbnail images in this folder
2. **Supported formats**: JPG, PNG, WebP, GIF
3. **Recommended dimensions**: 800x600 pixels (4:3 aspect ratio) or 1200x675 pixels (16:9 aspect ratio)
4. **File naming**: Use descriptive names that relate to your blog post content

## Adding thumbnails to blog posts

In your MDX frontmatter, add the `thumbnail` field:

```yaml
---
title: "Your Blog Post Title"
author: "LUCI"
date: "2025-01-02"
tags: ["Tag1", "Tag2"]
thumbnail: "your-image-filename.jpg"
---
```

## Examples

- `bayesian-monad-minds.jpg` - Used for the Bayesian inference article
- `quantum-superposition.jpg` - Example for quantum superposition article

## Fallback

If no thumbnail is specified, posts will display a default placeholder with a "THEORETICAL EXPLORATION" label and a document icon.

## Image optimization

Next.js will automatically optimize images for different screen sizes and formats. Images are displayed at:
- Height: 192px (12rem) in the card layout
- Aspect ratio maintained with object-cover
- Hover effect: slight scale increase (105%) 