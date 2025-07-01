interface ArticleSchemaProps {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified: string
  url: string
  imageUrl?: string
  tags?: string[]
}

export function ArticleSchema({ 
  title, 
  description, 
  author, 
  datePublished, 
  dateModified, 
  url, 
  imageUrl,
  tags = []
}: ArticleSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Monadics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://monadics.dev/logo.png',
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    }),
    articleSection: 'Quantum Consciousness',
    keywords: tags.join(', '),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Website',
      name: 'Monadics',
      url: 'https://monadics.dev',
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Quantum Consciousness',
      },
      {
        '@type': 'Thing',
        name: 'Mathematics',
      },
      {
        '@type': 'Thing',
        name: 'Computation',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  )
} 