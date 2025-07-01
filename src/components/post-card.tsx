import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { FileText } from 'lucide-react'

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer border-border/50 overflow-hidden">
      <Link href={`/${post.slug}`}>
        {/* Thumbnail Section */}
        <div className="relative h-48 bg-muted/50 flex items-center justify-center overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={`/images/thumbnails/${post.thumbnail}`}
              alt={`Thumbnail for ${post.title}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-muted/30 to-muted/60">
              <FileText className="h-16 w-16 text-muted-foreground/40" />
              <div className="mt-4 text-center px-4">
                <p className="text-xs font-bold text-muted-foreground/60 uppercase leading-tight">
                  THEORETICAL EXPLORATION
                </p>
              </div>
            </div>
          )}
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        <CardHeader className="space-y-2">
          <h3 className="text-2xl font-black font-sans group-hover:text-primary transition-colors line-clamp-2">
            {post.title.toUpperCase()}
          </h3>
          <div className="flex items-center justify-between text-base font-bold text-muted-foreground">
            <span>{post.author.toUpperCase()}</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 font-medium">
            {post.excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="flex flex-wrap gap-1">
            {post.tags?.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs hover:bg-primary/10 transition-colors font-bold"
              >
                {tag.toUpperCase()}
              </Badge>
            ))}
            {post.tags && post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs font-bold">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
} 