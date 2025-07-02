import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllPosts, getPostBySlug, generateLinkWheel, getCategoryBreadcrumbs } from '@/lib/blog'
import { Layout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SocialShare } from '@/components/social-share'
import { ArticleSchema } from '@/components/article-schema'
import { InsightQuote } from '@/components/insight-quote'
import { PostCard } from '@/components/post-card'
import { generateBreadcrumbSchema } from '@/lib/seo'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
import type { Metadata } from 'next'

// Card wrapper for content sections
const ContentCard = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  if (title) {
    return (
      <Card className="my-6 bg-muted/20 border-muted">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="my-6 bg-muted/10 border-muted/40">
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  )
}

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: ({ children, ...props }: any) => <pre {...props}>{children}</pre>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  ContentCard,
  InsightQuote,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}

interface PageProps {
  params: { slug: string }
}

const CATEGORY_SLUG = 'theoretical-physics'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts
    .filter(post => post.categorySlug === CATEGORY_SLUG)
    .map((post) => ({
      slug: post.slug,
    }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug, CATEGORY_SLUG)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
  const articleUrl = `${siteUrl}/${CATEGORY_SLUG}/${post.slug}`
  const thumbnailUrl = post.thumbnail ? `${siteUrl}/images/thumbnails/${post.thumbnail}` : `${siteUrl}/og-image.png`
  
  return {
    title: post.title,
    description: post.excerpt || `An exploration of ${post.tags?.join(', ') || 'consciousness and computation'} by ${post.author}`,
    keywords: post.tags?.join(', ') + ', quantum consciousness, mathematics, computation, philosophy',
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Monadics',
    robots: 'index, follow',
    alternates: {
      canonical: articleUrl,
    },
    
    openGraph: {
      title: post.title,
      description: post.excerpt || `An exploration of ${post.tags?.join(', ') || 'consciousness and computation'} by ${post.author}`,
      type: 'article',
      url: articleUrl,
      siteName: 'Monadics',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
    },
    
    twitter: {
      card: 'summary_large_image',
      site: '@monadics',
      creator: '@monadics',
      title: post.title,
      description: post.excerpt || `An exploration of ${post.tags?.join(', ') || 'consciousness and computation'} by ${post.author}`,
      images: [thumbnailUrl],
    },
  }
}

export default function CategoryPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug, CATEGORY_SLUG)

  if (!post) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
  const articleUrl = `${siteUrl}/${CATEGORY_SLUG}/${post.slug}`
  const readingTime = calculateReadingTime(post.content)
  const linkWheels = generateLinkWheel(post)
  const breadcrumbs = getCategoryBreadcrumbs(CATEGORY_SLUG, params.slug)

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(crumb => ({
      name: crumb.name,
      url: crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`
    }))
  )

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2),
        }}
      />
      
      <ArticleSchema
        title={post.title}
        description={post.excerpt || `An exploration of ${post.tags?.join(', ') || 'consciousness and computation'} by ${post.author}`}
        author={post.author}
        datePublished={post.date}
        dateModified={post.date}
        url={articleUrl}
        imageUrl={post.thumbnail ? `${siteUrl}/images/thumbnails/${post.thumbnail}` : undefined}
        tags={post.tags}
      />
      
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.url} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-primary font-bold">{crumb.name}</span>
                ) : (
                  <Link 
                    href={crumb.url}
                    className="hover:text-primary transition-colors font-bold uppercase"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Category Badge */}
        {post.category && (
          <div className="mb-4">
            <Link href={`/category/${CATEGORY_SLUG}`}>
              <Badge variant="outline" className="text-xs font-bold px-3 py-1 border-primary/20 text-primary hover:bg-primary/10 transition-colors">
                {post.category.toUpperCase()}
              </Badge>
            </Link>
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-sans text-primary">
            {post.title.toUpperCase()}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="font-bold text-lg">{post.author.toUpperCase()}</span>
              <span className="text-xl">•</span>
              <time dateTime={post.date} className="font-bold text-lg">{formatDate(post.date)}</time>
              <span className="text-xl">•</span>
              <span className="font-bold text-lg">{formatReadingTime(readingTime)}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="hover:bg-primary/10 font-bold">
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="mb-8" />
        </header>

        {/* Featured Image */}
        {post.thumbnail && (
          <div className="mb-12">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src={`/images/thumbnails/${post.thumbnail}`}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                style={{ objectPosition: '50% 25%' }}
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>

        {/* Link Wheels - Related Content */}
        {linkWheels.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border/40">
            {linkWheels.map((wheel, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-lg font-black font-sans text-primary uppercase mb-6">
                  {wheel.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wheel.posts.map((relatedPost) => (
                    <PostCard 
                      key={relatedPost.slug} 
                      post={relatedPost}
                      linkPrefix={relatedPost.categorySlug ? `/${relatedPost.categorySlug}` : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h3 className="text-lg font-black font-sans text-primary uppercase mb-4">
                  SHARE THIS EXPLORATION
                </h3>
                <SocialShare 
                  title={post.title}
                  url={articleUrl}
                  description={post.excerpt}
                />
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-muted/30 rounded-lg p-6 border">
                <h3 className="text-lg font-black font-sans text-primary uppercase mb-4">
                  EXPLORE MORE
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-4">
                  CONTINUE YOUR JOURNEY THROUGH THE QUANTUM LANDSCAPE OF CONSCIOUSNESS 
                  AND COMPUTATION WITH MORE THEORETICAL EXPLORATIONS.
                </p>
                <div className="space-y-2">
                  <Link 
                    href={`/category/${CATEGORY_SLUG}`}
                    className="block text-primary font-bold text-sm hover:text-primary/80 transition-colors uppercase"
                  >
                    ALL {post.category?.toUpperCase()} →
                  </Link>
                  <Link 
                    href="/" 
                    className="block text-primary font-bold text-sm hover:text-primary/80 transition-colors uppercase"
                  >
                    ALL ARTICLES →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
} 