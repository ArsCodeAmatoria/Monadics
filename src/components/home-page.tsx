'use client'

import { useState } from 'react'
import { PostCard } from '@/components/post-card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { BlogPost } from '@/lib/blog'
import { Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface HomePageProps {
  posts: BlogPost[]
  tags: string[]
}

export function HomePage({ posts, tags }: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Find the headline article (The 10th Door)
  const headlinePost = posts.find(post => post.slug === 'the-tenth-door-singularity-being')

  const filteredPosts = posts.filter(post => {
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesTag && matchesSearch
  })

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black mb-8 text-primary font-sans">
          MONADICS
        </h1>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
          A cerebral exploration of theoretical quantum consciousness, mathematical formalisms, 
          and monadic computation. Where minds meet mathematics at the intersection of reality and code.
        </p>
      </div>

      {/* Headline Article Section */}
      {headlinePost && (
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-primary font-sans mb-2">FEATURED EXPLORATION</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          {/* Full-Width Hero Feature */}
          <div className="max-w-7xl mx-auto">
            <Card className="overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-muted hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-0">
                {/* Hero Image */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image 
                    src={`/images/thumbnails/${headlinePost.thumbnail}`}
                    alt={headlinePost.title}
                    fill
                    className="object-cover object-center transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge variant="secondary" className="text-xs font-mono bg-background/90 text-primary border-primary/20 backdrop-blur-sm">
                      MYSTICAL TREATISE
                    </Badge>
                  </div>
                </div>
                
                {/* Content Overlay */}
                <div className="relative -mt-32 mx-6 mb-6 p-8 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
                  <div className="text-center space-y-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-primary font-sans leading-tight mb-4">
                        {headlinePost.title.toUpperCase()}
                      </h3>
                      <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed italic max-w-3xl mx-auto">
                      {headlinePost.excerpt}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm">{headlinePost.author}</span>
                        <span>•</span>
                        <time className="font-bold text-sm">{new Date(headlinePost.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</time>
                      </div>
                      
                      {headlinePost.tags && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {headlinePost.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs font-bold">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <Link 
                        href={`/${headlinePost.slug}`}
                        className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-bold text-base rounded-lg hover:bg-primary/90 transition-colors group shadow-lg"
                      >
                        ENTER THE DOOR
                        <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10 transition-colors font-bold"
            onClick={() => setSelectedTag(null)}
          >
            ALL POSTS
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors font-bold"
              onClick={() => setSelectedTag(tag)}
            >
              {tag.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or clear the filters.
          </p>
        </div>
      )}
    </>
  )
} 