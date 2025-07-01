'use client'

import { useState } from 'react'
import { PostCard } from '@/components/post-card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { BlogPost } from '@/lib/blog'
import { Search } from 'lucide-react'

interface HomePageProps {
  posts: BlogPost[]
  tags: string[]
}

export function HomePage({ posts, tags }: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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