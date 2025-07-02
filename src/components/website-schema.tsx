export function WebsiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Monadics',
    alternateName: 'Monadics Blog',
    url: siteUrl,
    description: 'A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation. Where minds meet mathematics at the intersection of reality and code.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Monadics',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630
      },
      sameAs: [
        'https://twitter.com/monadics',
        'https://github.com/monadics'
      ]
    },
    mainEntity: {
      '@type': 'Blog',
      name: 'Monadics Blog',
      description: 'Exploring quantum consciousness through mathematical computation',
      url: siteUrl,
      author: {
        '@type': 'Person',
        name: 'LUCI',
        url: `${siteUrl}/about`
      },
      blogPost: {
        '@type': 'BlogPosting',
        about: [
          {
            '@type': 'Thing',
            name: 'Quantum Consciousness'
          },
          {
            '@type': 'Thing', 
            name: 'Mathematical Computation'
          },
          {
            '@type': 'Thing',
            name: 'Monadic Programming'
          },
          {
            '@type': 'Thing',
            name: 'Theoretical Physics'
          }
        ]
      }
    },
    keywords: [
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
    ]
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