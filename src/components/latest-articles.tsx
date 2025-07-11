'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  date: string
  categorySlug?: string
}

export function LatestArticles() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch latest posts from API route
    fetch('/api/latest-posts')
      .then(res => res.json())
      .then(data => {
        setLatestPosts(data.slice(0, 2))
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching latest posts:', err)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getPostUrl = (post: BlogPost) => {
    if (post.categorySlug) {
      return `/${post.categorySlug}/${post.slug}`
    }
    return `/${post.slug}`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-black font-sans text-primary uppercase">
          LATEST ARTICLES
        </h3>
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted/50 rounded w-1/2"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-muted/50 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black font-sans text-primary uppercase">
        LATEST ARTICLES
      </h3>
      <div className="space-y-4">
        {latestPosts.map((post) => (
          <Link 
            key={post.slug}
            href={getPostUrl(post)}
            className="block group"
          >
            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase leading-tight">
              {post.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {formatDate(post.date)}
            </p>
          </Link>
        ))}
        
        <Link 
          href="/"
          className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase"
        >
          ALL ARTICLES <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  )
} 