import { notFound } from 'next/navigation'
import { Layout } from '@/components/layout'
import { PostCard } from '@/components/post-card'
import { Badge } from '@/components/ui/badge'
import { generateBreadcrumbSchema } from '@/lib/seo'
import { getPostsByTag, getAllTags, getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

interface TagPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    slug: encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-')),
  }))
}

export function generateMetadata({ params }: TagPageProps): Metadata {
  const tagName = decodeURIComponent(params.slug).replace(/-/g, ' ').toUpperCase()
  const posts = getPostsByTag(tagName)
  
  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
  const tagUrl = `${siteUrl}/tag/${params.slug}`

  return {
    title: `${tagName} Articles`,
    description: `Explore ${posts.length} articles tagged with "${tagName}" covering quantum consciousness, mathematical computation, and theoretical explorations on Monadics.`,
    keywords: [
      tagName.toLowerCase(),
      'quantum consciousness',
      'mathematical computation',
      'theoretical physics',
      'philosophy',
      'monadics blog'
    ],
    alternates: {
      canonical: tagUrl,
    },
    openGraph: {
      title: `${tagName} Articles | Monadics`,
      description: `Explore ${posts.length} articles tagged with "${tagName}" covering quantum consciousness, mathematical computation, and theoretical explorations.`,
      type: 'website',
      url: tagUrl,
      siteName: 'Monadics',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${tagName} Articles - Monadics`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tagName} Articles | Monadics`,
      description: `Explore ${posts.length} articles tagged with "${tagName}" covering quantum consciousness, mathematical computation, and theoretical explorations.`,
      images: ['/og-image.png'],
    },
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.slug).replace(/-/g, ' ').toUpperCase()
  const posts = getPostsByTag(tagName)
  
  if (posts.length === 0) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
  const allTags = getAllTags()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: `${tagName} Articles`, url: `${siteUrl}/tag/${params.slug}` }
  ])

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2),
        }}
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Tag Header */}
        <div className="mb-12">
          <div className="mb-4">
            <Badge variant="outline" className="text-xs font-bold px-3 py-1 border-primary/20 text-primary">
              TAG
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 font-sans text-primary uppercase">
            {tagName}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Explore all articles tagged with "{tagName}" - deep dives into quantum consciousness, 
            mathematical computation, and theoretical explorations.
          </p>
          
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <span className="font-bold text-lg">{posts.length} ARTICLES</span>
            <span className="text-xl">•</span>
            <span className="font-bold text-lg">EXPLORE THE DEPTHS</span>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard 
              key={post.slug} 
              post={post}
              linkPrefix={post.categorySlug ? `/${post.categorySlug}` : undefined}
            />
          ))}
        </div>

        {/* Related Tags */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <h2 className="text-2xl font-black font-sans text-primary uppercase mb-8">
            Explore Other Topics
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {allTags
              .filter(tag => tag !== tagName)
              .slice(0, 12)
              .map((tag) => {
                const tagPosts = getPostsByTag(tag)
                const tagSlug = encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))
                return (
                  <a
                    key={tag}
                    href={`/tag/${tagSlug}`}
                    className="inline-flex items-center px-4 py-2 bg-muted/20 rounded-lg border hover:border-primary/20 hover:bg-primary/10 transition-colors group"
                  >
                    <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors uppercase">
                      {tag}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {tagPosts.length}
                    </span>
                  </a>
                )
              })}
          </div>
          
          <div className="mt-6">
            <a 
              href="/"
              className="inline-flex items-center text-primary font-bold text-sm hover:text-primary/80 transition-colors uppercase"
            >
              ALL ARTICLES →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
} 