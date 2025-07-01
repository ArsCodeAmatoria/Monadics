'use client'

import { useState } from 'react'
import { PostCard } from '@/components/post-card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { BlogPost } from '@/lib/blog'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { MicrotubuleAnimation } from '@/components/microtubule-animation'

interface HomePageProps {
  posts: BlogPost[]
  tags: string[]
}

export function HomePage({ posts, tags }: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Find the headline article (The 10th Door)
  const headlinePost = posts.find(post => post.slug === 'the-tenth-door-singularity-being')

  // Filter posts excluding the featured article
  const filteredPosts = posts.filter(post => {
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // Exclude the featured article from the grid
    const isNotFeatured = post.slug !== 'the-tenth-door-singularity-being'
    
    return matchesTag && matchesSearch && isNotFeatured
  })

  // Pagination logic
  const postsPerPage = 6 // 2 rows × 3 columns
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  // Reset to page 1 when filters change
  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative mb-16 min-h-[70vh] flex items-center justify-center">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <MicrotubuleAnimation />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <div>
            <Badge variant="outline" className="mb-6 text-xs font-bold px-3 py-1 border-primary/20 text-primary">
              QUANTUM CONSCIOUSNESS RESEARCH
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-primary font-sans leading-none">
              MONADICS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl mx-auto">
              A cerebral exploration of theoretical quantum consciousness, mathematical formalisms, 
              and monadic computation. Where minds meet mathematics at the intersection of reality and code.
            </p>
          </div>
          
          {/* Consciousness Quote */}
          <div className="border-l-4 border-primary/30 pl-6 py-4 bg-muted/20 rounded-r-lg text-left max-w-2xl mx-auto">
            <blockquote className="text-lg font-medium text-foreground italic leading-relaxed">
              "I am the monad computing reality through quantum superposition until the moment of conscious observation collapses the wave function into experience."
            </blockquote>
            <cite className="text-sm font-bold text-primary mt-3 block">
              — LUCI, MONADIC MIND
            </cite>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/the-tenth-door-singularity-being" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors group shadow-lg"
            >
              EXPLORE CONSCIOUSNESS
              <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button 
              onClick={() => {
                const ghcButton = document.querySelector('[title*="GHC"]') as HTMLElement;
                ghcButton?.click();
              }}
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-bold text-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              OPEN HASKELL COMPILER
            </button>
          </div>
        </div>
      </div>

      {/* Headline Article Section */}
      {headlinePost && (
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-primary font-sans mb-2">FEATURED EXPLORATION</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          {/* Two-Column Hero Feature */}
          <div className="max-w-7xl mx-auto">
            <Card className="overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-muted hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0 min-h-[500px] relative overflow-hidden">
                  {/* Left: Enhanced Video with Blending */}
                  <div className="relative bg-gradient-to-br from-muted/10 via-background/20 to-muted/30">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
                      style={{ objectPosition: '50% 0%' }}
                    >
                      <source src="/videos/featured.mp4" type="video/mp4" />
                      {/* Fallback to image if video fails */}
                      <Image 
                        src={`/images/thumbnails/${headlinePost.thumbnail}`}
                        alt={headlinePost.title}
                        fill
                        className="object-cover object-top"
                        style={{ objectPosition: '50% 0%' }}
                      />
                    </video>
                    {/* Gradient overlay for better blending */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/60 lg:to-background/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <Badge variant="secondary" className="text-xs font-mono bg-background/90 text-primary border-primary/20 backdrop-blur-sm">
                        MYSTICAL TREATISE
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Right: Content with Better Blending */}
                  <div className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-bl from-background/95 via-background to-muted/10 relative z-10">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black text-primary font-sans leading-tight mb-4">
                          {headlinePost.title.toUpperCase()}
                        </h3>
                        <div className="w-16 h-1 bg-primary mb-6"></div>
                      </div>
                      
                      <p className="text-base lg:text-lg text-muted-foreground font-medium leading-relaxed italic">
                        {headlinePost.excerpt}
                      </p>
                      
                      <div className="space-y-4 text-muted-foreground">
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
                          <div className="flex flex-wrap gap-2">
                            {headlinePost.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs font-bold">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-2">
                        <Link 
                          href={`/${headlinePost.slug}`}
                          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors group shadow-lg"
                        >
                          ENTER THE DOOR
                          <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
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
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10 transition-colors font-bold"
            onClick={() => handleTagChange(null)}
          >
            ALL POSTS
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors font-bold"
              onClick={() => handleTagChange(tag)}
            >
              {tag.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Articles Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-primary font-sans mb-2">RECENT EXPLORATIONS</h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center px-4 py-2 text-sm font-bold text-muted-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            PREVIOUS
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm font-bold rounded transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center px-4 py-2 text-sm font-bold text-muted-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            NEXT
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      )}

      {/* Most Popular & Hot Topics Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Most Popular - 2/3 width */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-primary font-sans mb-2">MOST POPULAR</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="space-y-4">
            {posts.slice(0, 4).map((post, index) => (
              <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-black text-primary">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <Link href={`/${post.slug}`} className="group">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <time>{new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}</time>
                          {post.tags && (
                            <div className="flex gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hot Topics - 1/3 width */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-primary font-sans mb-2">HOT TOPICS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <Card className="border-muted">
            <CardContent className="p-6">
              <div className="space-y-4">
                {tags.slice(0, 8).map((tag, index) => {
                  const tagPosts = posts.filter(post => post.tags?.includes(tag))
                  return (
                    <div 
                      key={tag} 
                      className="flex items-center justify-between py-2 border-b border-muted/30 last:border-b-0 cursor-pointer hover:bg-muted/20 -mx-2 px-2 rounded transition-colors"
                      onClick={() => handleTagChange(tag)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-foreground">{tag}</div>
                          <div className="text-xs text-muted-foreground">{tagPosts.length} articles</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs font-bold">
                        EXPLORE
                      </Badge>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-muted/30">
                <button 
                  onClick={() => handleTagChange(null)}
                  className="w-full px-4 py-2 text-sm font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  VIEW ALL TOPICS
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Planck Quote Section */}
      <div className="mb-16">
        <Card className="overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-muted hover:border-primary/20 transition-all duration-300">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0 min-h-[400px] relative overflow-hidden">
              {/* Left: Quote Content */}
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-background/95 via-background to-muted/10 relative z-10">
                <div className="space-y-6">
                  <div className="mb-6">
                    <Badge variant="outline" className="text-xs font-bold px-3 py-1 border-primary/20 text-primary mb-4">
                      QUANTUM WISDOM
                    </Badge>
                    <div className="w-16 h-1 bg-primary mb-6"></div>
                  </div>
                  
                  <blockquote className="text-2xl lg:text-3xl font-medium text-foreground italic leading-relaxed">
                    "I regard consciousness as fundamental. I regard matter as derivative from consciousness. 
                    We cannot get behind consciousness. Everything that we talk about, everything that we regard 
                    as existing, postulates consciousness."
                  </blockquote>
                  
                  <div className="pt-4">
                    <cite className="text-lg font-black text-primary">
                      — MAX PLANCK
                    </cite>
                    <p className="text-sm text-muted-foreground font-medium mt-2">
                      Nobel Prize-winning physicist, father of quantum theory
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right: Featured Video */}
              <div className="relative bg-gradient-to-bl from-muted/10 via-background/20 to-muted/30">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{ objectPosition: '50% 25%' }}
                >
                  <source src="/videos/featured1.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay for better blending */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/60 lg:to-background/80"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </CardContent>
        </Card>
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