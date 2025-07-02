import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store (in production, use a database)
const urlStore = new Map<string, string>()
const reverseStore = new Map<string, string>()

// Generate a short code
function generateShortCode(length = 6): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Check if URL is already shortened
    if (reverseStore.has(url)) {
      const existingCode = reverseStore.get(url)!
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
      return NextResponse.json({ 
        shortUrl: `${siteUrl}/s/${existingCode}`,
        code: existingCode,
        originalUrl: url 
      })
    }

    // Generate new short code
    let shortCode = generateShortCode()
    while (urlStore.has(shortCode)) {
      shortCode = generateShortCode()
    }

    // Store the mapping
    urlStore.set(shortCode, url)
    reverseStore.set(url, shortCode)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
    const shortUrl = `${siteUrl}/s/${shortCode}`

    return NextResponse.json({ 
      shortUrl,
      code: shortCode,
      originalUrl: url 
    })
  } catch (error) {
    console.error('Error shortening URL:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 