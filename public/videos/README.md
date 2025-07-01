# Videos Directory

This directory contains video content for the Monadics website.

## Organization

Videos should be organized by content type or topic:

- **lectures/** - Academic presentations and talks
- **tutorials/** - Haskell and consciousness programming tutorials  
- **explorations/** - Visual explorations of quantum consciousness concepts
- **interviews/** - Discussions with researchers and thinkers
- **animations/** - Animated explanations of complex concepts

## Supported Formats

- **MP4** (recommended for web compatibility)
- **WebM** (for modern browsers)
- **MOV** (will be converted to web formats)

## Naming Convention

Use descriptive, lowercase filenames with hyphens:
- `monadic-consciousness-intro.mp4`
- `haskell-quantum-computing-tutorial.mp4`
- `bayes-inference-visualization.mp4`

## Integration

Videos can be embedded in MDX articles using:

```jsx
<video controls width="100%">
  <source src="/videos/your-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

Or with Next.js dynamic imports for more advanced video components. 