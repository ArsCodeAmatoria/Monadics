'use client'

import { Button } from '@/components/ui/button'
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link, 
  Mail,
  MessageSquare
} from 'lucide-react'

interface SocialShareProps {
  title: string
  url: string
  description?: string
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-6 bg-muted/30 rounded-lg border">
      <h3 className="text-lg font-black font-sans text-primary uppercase">
        SHARE THIS EXPLORATION
      </h3>
      
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => window.open(shareLinks.twitter, '_blank')}
        >
          <Twitter className="h-4 w-4 mr-2" />
          TWITTER
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => window.open(shareLinks.facebook, '_blank')}
        >
          <Facebook className="h-4 w-4 mr-2" />
          FACEBOOK
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => window.open(shareLinks.linkedin, '_blank')}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LINKEDIN
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => window.open(shareLinks.reddit, '_blank')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          REDDIT
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => window.open(shareLinks.email, '_blank')}
        >
          <Mail className="h-4 w-4 mr-2" />
          EMAIL
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={copyToClipboard}
        >
          <Link className="h-4 w-4 mr-2" />
          COPY LINK
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground font-medium">
        SPREAD THE QUANTUM CONSCIOUSNESS
      </p>
    </div>
  )
} 