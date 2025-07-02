export const SEO_CONFIG = {
  siteName: 'Monadics',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app',
  defaultTitle: 'Monadics - Quantum Consciousness & Mathematical Computation',
  titleTemplate: '%s | Monadics',
  defaultDescription: 'A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation. Where minds meet mathematics at the intersection of reality and code.',
  defaultKeywords: [
    'quantum consciousness',
    'monads',
    'mathematics',
    'computation',
    'philosophy',
    'haskell',
    'functional programming',
    'bayesian inference',
    'quantum computing',
    'consciousness studies',
    'orch-or theory',
    'mathematical formalism',
    'theoretical physics',
    'artificial intelligence',
    'cognitive science'
  ],
  author: {
    name: 'LUCI',
    twitter: '@monadics',
    url: 'https://monadics.vercel.app/about'
  },
  social: {
    twitter: '@monadics',
    github: 'https://github.com/monadics'
  },
  images: {
    defaultOg: '/og-image.png',
    ogWidth: 1200,
    ogHeight: 630,
    twitterCard: 'summary_large_image'
  }
}

export function generatePageTitle(title?: string): string {
  if (!title || title === 'Home') {
    return SEO_CONFIG.defaultTitle
  }
  return `${title} | ${SEO_CONFIG.siteName}`
}

export function generateCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SEO_CONFIG.siteUrl}${cleanPath}`
}

export function generateArticleSchema(article: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified: string
  url: string
  imageUrl?: string
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
      url: SEO_CONFIG.author.url
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.images.defaultOg}`,
        width: SEO_CONFIG.images.ogWidth,
        height: SEO_CONFIG.images.ogHeight
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    url: article.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    ...(article.imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: article.imageUrl,
        width: SEO_CONFIG.images.ogWidth,
        height: SEO_CONFIG.images.ogHeight
      }
    }),
    articleSection: 'Quantum Consciousness',
    keywords: article.tags?.join(', ') || SEO_CONFIG.defaultKeywords.join(', '),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Website',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl
    },
    about: [
      { '@type': 'Thing', name: 'Quantum Consciousness' },
      { '@type': 'Thing', name: 'Mathematics' },
      { '@type': 'Thing', name: 'Computation' }
    ]
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax and HTML tags
  const cleanContent = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  if (cleanContent.length <= maxLength) {
    return cleanContent
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf('.')
  
  if (lastSentence > maxLength * 0.6) {
    return truncated.substring(0, lastSentence + 1)
  }
  
  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.substring(0, lastSpace) + '...'
}

export function optimizeImageUrl(imagePath: string, width?: number, height?: number): string {
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  const baseUrl = imagePath.startsWith('/') ? SEO_CONFIG.siteUrl + imagePath : `${SEO_CONFIG.siteUrl}/${imagePath}`
  
  // Add cache busting and optimization parameters if needed
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
} 