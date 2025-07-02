'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link, 
  Mail,
  MessageSquare,
  Download,
  Share
} from 'lucide-react'

interface SocialShareProps {
  title: string
  url: string
  description?: string
  thumbnail?: string
}

export function SocialShare({ title, url, description, thumbnail }: SocialShareProps) {
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

  const shareWithImage = async () => {
    if (!thumbnail) return
    
    try {
      // Fetch the image as a blob
      const response = await fetch(`/images/thumbnails/${thumbnail}`)
      const blob = await response.blob()
      
      // Create a File object from the blob
      const file = new File([blob], `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`, {
        type: blob.type,
      })
      
      // Check if Web Share API is supported and can share files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: title,
          text: `${description || title}\n\n`,
          url: url,
          files: [file]
        })
      } else {
        // Fallback to regular sharing
        const shareText = `${title}\n\n${description || ''}\n\n${url}`
        if (navigator.share) {
          await navigator.share({
            title: title,
            text: shareText,
            url: url
          })
        } else {
          // Copy to clipboard as final fallback
          await navigator.clipboard.writeText(shareText)
          alert('Share content copied to clipboard! You can now paste it and manually attach the image.')
        }
      }
    } catch (err) {
      console.error('Failed to share:', err)
      // Fallback to opening Twitter
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedUrl}`, '_blank')
    }
  }

  const downloadImage = async () => {
    if (!thumbnail) return
    
    try {
      const response = await fetch(`/images/thumbnails/${thumbnail}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-thumbnail.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download image:', err)
    }
  }

  return (
    <div className="flex flex-col space-y-6 p-6 bg-muted/30 rounded-lg border">
      <h3 className="text-lg font-black font-sans text-primary uppercase">
        SHARE THIS EXPLORATION
      </h3>
      
      {/* Smart Sharing with Image */}
      {thumbnail && (
        <div className="space-y-4">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-primary/20">
            <Image
              src={`/images/thumbnails/${thumbnail}`}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              style={{ objectPosition: '50% 25%' }}
            />
          </div>
          
          {/* Smart Share Button */}
          <div className="text-center">
            <Button
              onClick={shareWithImage}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm px-6 py-3 mb-3"
            >
              <Share className="h-4 w-4 mr-2" />
              SHARE WITH IMAGE
            </Button>
            <p className="text-xs text-muted-foreground font-medium">
              Automatically includes title, description, URL, and image
            </p>
          </div>
          
          {/* Fallback Options */}
          <details className="group">
            <summary className="cursor-pointer text-xs text-muted-foreground font-medium hover:text-primary transition-colors">
              Manual sharing options ↓
            </summary>
            <div className="mt-3 pt-3 border-t border-muted/30">
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground font-medium">
                  Download image for manual attachment
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold text-xs"
                  onClick={downloadImage}
                >
                  <Download className="h-4 w-4 mr-2" />
                  DOWNLOAD
                </Button>
              </div>
            </div>
          </details>
        </div>
      )}
      
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
        {thumbnail ? 
          'Use "SHARE WITH IMAGE" for automatic image attachment, or manual sharing options below' :
          'SPREAD THE QUANTUM CONSCIOUSNESS'
        }
      </p>
    </div>
  )
} 