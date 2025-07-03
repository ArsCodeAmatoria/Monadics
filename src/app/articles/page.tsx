import { Layout } from '@/components/layout'
import { PostCard } from '@/components/post-card'
import { Badge } from '@/components/ui/badge'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Articles | Monadics',
  description: 'Browse all articles covering quantum consciousness, mathematical computation, theoretical physics, and philosophical explorations on Monadics.',
  keywords: ['quantum consciousness', 'mathematical computation', 'theoretical physics', 'philosophy', 'monadics blog', 'all articles'],
  openGraph: {
    title: 'All Articles | Monadics',
    description: 'Browse all articles covering quantum consciousness, mathematical computation, theoretical physics, and philosophical explorations.',
    type: 'website',
    siteName: 'Monadics',
  },
}

export default function AllArticlesPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <div className="mb-4">
            <Badge variant="outline" className="text-xs font-bold px-3 py-1 border-primary/20 text-primary">
              COMPLETE ARCHIVE
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 font-sans text-primary">
            ALL ARTICLES
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Explore our complete collection of articles covering quantum consciousness, 
            mathematical computation, theoretical physics, and philosophical investigations 
            into the nature of mind and reality.
          </p>
          
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <span className="font-bold text-lg">{posts.length} TOTAL ARTICLES</span>
            <span className="text-xl">•</span>
            <span className="font-bold text-lg">{tags.length} RESEARCH TOPICS</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 p-6 bg-muted/20 rounded-lg border">
          <h2 className="text-lg font-black text-primary mb-4">BROWSE BY CATEGORY</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/category/quantum-consciousness" className="inline-flex items-center px-4 py-2 bg-background rounded-lg border hover:border-primary/30 hover:bg-primary/10 transition-colors group">
              <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                QUANTUM CONSCIOUSNESS
              </span>
            </Link>
            <Link href="/category/monadic-programming" className="inline-flex items-center px-4 py-2 bg-background rounded-lg border hover:border-primary/30 hover:bg-primary/10 transition-colors group">
              <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                MONADIC PROGRAMMING
              </span>
            </Link>
            <Link href="/category/theoretical-physics" className="inline-flex items-center px-4 py-2 bg-background rounded-lg border hover:border-primary/30 hover:bg-primary/10 transition-colors group">
              <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                THEORETICAL PHYSICS
              </span>
            </Link>
            <Link href="/category/philosophy" className="inline-flex items-center px-4 py-2 bg-background rounded-lg border hover:border-primary/30 hover:bg-primary/10 transition-colors group">
              <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                PHILOSOPHY
              </span>
            </Link>
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard 
              key={post.slug} 
              post={post}
              linkPrefix={post.categorySlug ? `/${post.categorySlug}` : undefined}
            />
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-border/40 text-center">
          <h2 className="text-2xl font-black font-sans text-primary uppercase mb-4">
            Continue Exploring
          </h2>
          <p className="text-muted-foreground mb-6">
            Dive deeper into the quantum landscape of consciousness and computation
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/about"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-bold text-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              ABOUT LUCI
            </Link>
            <Link 
              href="/rss.xml"
              className="inline-flex items-center px-6 py-3 border-2 border-muted text-muted-foreground font-bold text-sm rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              RSS FEED
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
} 