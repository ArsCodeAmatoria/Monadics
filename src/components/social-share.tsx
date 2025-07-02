'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect, useCallback } from 'react'
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
  thumbnail?: string
}

export function SocialShare({ title, url, description, thumbnail }: SocialShareProps) {
  const [shortUrl, setShortUrl] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Automatically generate short URL on component mount
  const generateShortUrl = useCallback(async () => {
    if (shortUrl || isGenerating) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setShortUrl(data.shortUrl)
      }
    } catch (error) {
      console.error('Failed to generate short URL:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [url, shortUrl, isGenerating])

  // Auto-generate short URL when component mounts
  useEffect(() => {
    generateShortUrl()
  }, [url, generateShortUrl])
  
  const currentUrl = shortUrl || url
  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }





  // Smart sharing that relies on meta tags for proper image display
  const smartShare = async (platform?: 'twitter' | 'facebook' | 'linkedin' | 'reddit' | 'email') => {
    // Platform-specific sharing for best image display
    if (platform) {
      window.open(shareLinks[platform], '_blank')
    } else {
      // Generic Web Share API fallback (without file attachment)
      const shareText = `${title}\n\n${description || ''}\n\n${currentUrl}`
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            text: shareText,
            url: currentUrl
          })
        } catch {
          // Copy to clipboard as final fallback
          await navigator.clipboard.writeText(shareText)
        }
      } else {
        await navigator.clipboard.writeText(shareText)
      }
    }
  }

  return (
    <div className="flex flex-col space-y-6 p-6 bg-muted/30 rounded-lg border">
      

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => smartShare('twitter')}
        >
          <Twitter className="h-4 w-4 mr-2" />
          TWITTER
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => smartShare('facebook')}
        >
          <Facebook className="h-4 w-4 mr-2" />
          FACEBOOK
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => smartShare('linkedin')}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LINKEDIN
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => smartShare('reddit')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          REDDIT
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => smartShare('email')}
        >
          <Mail className="h-4 w-4 mr-2" />
          EMAIL
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs"
          onClick={() => navigator.clipboard.writeText(currentUrl)}
        >
          <Link className="h-4 w-4 mr-2" />
          COPY LINK
        </Button>
      </div>
      

    </div>
  )
} 