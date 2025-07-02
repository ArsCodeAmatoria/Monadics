'use client'

import { BlogPost } from '@/lib/blog'

export function DebugMeta({ post, siteUrl }: { post: BlogPost, siteUrl: string }) {
  if (process.env.NODE_ENV !== 'development') return null
  
  const thumbnailUrl = post.thumbnail ? `${siteUrl}/images/thumbnails/${post.thumbnail}` : `${siteUrl}/og-image.png`
  const pageUrl = `${siteUrl}/${post.slug}`
  
  const testImageAccess = () => {
    fetch(thumbnailUrl)
      .then(response => {
        console.log('Image fetch test:', response.status, response.ok)
        alert(`Image fetch: ${response.status} ${response.ok ? 'OK' : 'FAILED'}`)
      })
      .catch(err => {
        console.error('Image fetch error:', err)
        alert('Image fetch FAILED - ' + err.message)
      })
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-md z-50 space-y-3">
      <h4 className="font-bold mb-2">🐛 Debug: Twitter Cards</h4>
      
      <div className="space-y-1">
        <div><strong>Site URL:</strong> {siteUrl}</div>
        <div><strong>Page URL:</strong> {pageUrl}</div>
        <div><strong>Thumbnail:</strong> {post.thumbnail}</div>
        <div><strong>Image URL:</strong> {thumbnailUrl}</div>
      </div>
      
      <div className="space-y-2 pt-2 border-t border-gray-600">
        <button 
          onClick={testImageAccess}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs font-bold w-full"
        >
          🔍 Test Image Access
        </button>
        
        <a 
          href={`https://cards-dev.twitter.com/validator`}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-blue-800 hover:bg-blue-900 px-2 py-1 rounded text-xs font-bold text-center"
        >
          🐦 Twitter Card Validator
        </a>
        
        <a 
          href={thumbnailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs font-bold text-center"
        >
          🖼️ Open Image Direct
        </a>
      </div>
      
      <div className="text-xs text-gray-300">
        <div>1. Test image access ✓</div>
        <div>2. Open image direct ✓</div>
        <div>3. Test in Twitter validator ✓</div>
        <div>4. Share page URL on Twitter ✓</div>
      </div>
    </div>
  )
} 