import { notFound } from 'next/navigation'
import { Layout } from '@/components/layout'
import { PostCard } from '@/components/post-card'
import { Badge } from '@/components/ui/badge'
import { generateBreadcrumbSchema } from '@/lib/seo'
import { CATEGORIES, getPostsByCategory, getAllCategories } from '@/lib/blog'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const categoryConfig = CATEGORIES[params.slug as keyof typeof CATEGORIES]
  
  if (!categoryConfig) {
    return {
      title: 'Category Not Found',
    }
  }

  const posts = getPostsByCategory(params.slug)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
  const categoryUrl = `${siteUrl}/category/${params.slug}`

  return {
    title: categoryConfig.name,
    description: `${categoryConfig.description}. Explore ${posts.length} articles covering ${categoryConfig.name.toLowerCase()} on Monadics.`,
    keywords: [
      categoryConfig.name.toLowerCase(),
      'quantum consciousness',
      'mathematical computation',
      'theoretical physics',
      'philosophy',
      'monadics blog'
    ],
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${categoryConfig.name} | Monadics`,
      description: `${categoryConfig.description}. Explore ${posts.length} articles covering ${categoryConfig.name.toLowerCase()} on Monadics.`,
      type: 'website',
      url: categoryUrl,
      siteName: 'Monadics',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${categoryConfig.name} - Monadics`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryConfig.name} | Monadics`,
      description: `${categoryConfig.description}. Explore ${posts.length} articles covering ${categoryConfig.name.toLowerCase()} on Monadics.`,
      images: ['/og-image.png'],
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryConfig = CATEGORIES[params.slug as keyof typeof CATEGORIES]
  
  if (!categoryConfig) {
    notFound()
  }

  const posts = getPostsByCategory(params.slug)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: categoryConfig.name, url: `${siteUrl}/category/${params.slug}` }
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
        {/* Category Header */}
        <div className="mb-12">
          <div className="mb-4">
            <Badge variant="outline" className="text-xs font-bold px-3 py-1 border-primary/20 text-primary">
              CATEGORY
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 font-sans text-primary uppercase">
            {categoryConfig.name}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {categoryConfig.description}
          </p>
          
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <span className="font-bold text-lg">{posts.length} ARTICLES</span>
            <span className="text-xl">•</span>
            <span className="font-bold text-lg">EXPLORE THE DEPTHS</span>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard 
                key={post.slug} 
                post={post}
                linkPrefix={`/${params.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-muted-foreground mb-4">
              No articles found in this category yet.
            </h2>
            <p className="text-muted-foreground">
              Check back soon for new explorations in {categoryConfig.name.toLowerCase()}.
            </p>
          </div>
        )}

        {/* Link Wheel - Related Categories */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <h2 className="text-2xl font-black font-sans text-primary uppercase mb-8">
            Explore Other Dimensions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(CATEGORIES)
              .filter(([categorySlug]) => categorySlug !== params.slug)
              .map(([categorySlug, config]) => {
                const categoryPosts = getPostsByCategory(categorySlug)
                return (
                  <div key={categorySlug} className="bg-muted/20 rounded-lg p-6 border hover:border-primary/20 transition-colors">
                    <h3 className="text-lg font-bold text-primary mb-2 uppercase">
                      {config.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {config.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">
                        {categoryPosts.length} ARTICLES
                      </span>
                      <a 
                        href={`/category/${categorySlug}`}
                        className="text-primary font-bold text-sm hover:text-primary/80 transition-colors uppercase"
                      >
                        EXPLORE →
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </Layout>
  )
} 