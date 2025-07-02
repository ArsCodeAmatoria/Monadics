import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { Layout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SocialShare } from '@/components/social-share'
import { ArticleSchema } from '@/components/article-schema'
import { InsightQuote } from '@/components/insight-quote'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
  code({ className, children }: { className?: string; children?: React.ReactNode }) {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <div className="my-6">
        {/* Language badge before the code block */}
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="text-xs uppercase font-mono bg-muted text-muted-foreground">
            {match[1]}
          </Badge>
        </div>
        
        {/* Code block without relative positioning */}
        <div className="rounded-lg overflow-hidden border border-muted">
          <SyntaxHighlighter
            language={match[1]}
            style={dracula}
            PreTag="div"
            customStyle={{
              borderRadius: '0',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: '0',
              border: 'none'
            }}
            showLineNumbers={false}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    ) : (
      <code className={className}>
        {children}
      </code>
    )
  },
  InsightQuote,
  ContentCard,
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

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Determine the correct site URL for production
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://monadics.vercel.app')
  
  const articleUrl = `${siteUrl}/${post.slug}`
  // Use simple thumbnail URLs for better social media compatibility
  const thumbnailUrl = post.thumbnail ? `${siteUrl}/images/thumbnails/${post.thumbnail}` : `${siteUrl}/og-image.png`
  
  return {
    title: `${post.title} | Monadics`,
    description: post.excerpt || `An exploration of ${post.tags?.join(', ') || 'consciousness and computation'} by ${post.author}`,
    keywords: post.tags?.join(', ') + ', quantum consciousness, mathematics, computation, philosophy',
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Monadics',
    robots: 'index, follow',
    canonical: articleUrl,
    
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
    
    alternates: {
      canonical: articleUrl,
    },
    
    other: {
      // Article metadata
      'article:author': post.author,
      'article:published_time': post.date,
      'article:section': 'Quantum Consciousness',
      'article:tag': post.tags?.join(', ') || '',
      
      // Twitter Card meta tags (explicit)
      'twitter:card': 'summary_large_image',
      'twitter:site': '@monadics',
      'twitter:creator': '@monadics',
      'twitter:title': post.title,
      'twitter:description': post.excerpt || `An exploration of ${post.tags?.join(', ') || 'consciousness and computation'} by ${post.author}`,
      'twitter:image': thumbnailUrl,
      'twitter:image:alt': post.title,
      
      // OpenGraph meta tags (explicit)
      'og:type': 'article',
      'og:title': post.title,
      'og:description': post.excerpt || `An exploration of ${post.tags?.join(', ') || 'consciousness and computation'} by ${post.author}`,
      'og:image': thumbnailUrl,
      'og:image:alt': post.title,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:url': articleUrl,
      'og:site_name': 'Monadics',
    },
  }
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://monadics.vercel.app')
  const articleUrl = `${siteUrl}/${post.slug}`
  const readingTime = calculateReadingTime(post.content)

  return (
    <Layout>
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
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  CONTINUE YOUR JOURNEY THROUGH THE QUANTUM LANDSCAPE OF CONSCIOUSNESS 
                  AND COMPUTATION WITH MORE THEORETICAL EXPLORATIONS.
                </p>
                <div className="mt-4">
                  <a 
                    href="/" 
                    className="text-primary font-bold text-sm hover:text-primary/80 transition-colors uppercase"
                  >
                    ALL ARTICLES →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
} 