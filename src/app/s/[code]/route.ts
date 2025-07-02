import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store (should match the one in shorten/route.ts)
// In production, use a shared database
const urlStore = new Map<string, string>()

// Pre-populate with some common links for testing
urlStore.set('blog', 'https://monadics.vercel.app')
urlStore.set('ghc', 'https://monadics.vercel.app')
urlStore.set('about', 'https://monadics.vercel.app/about')

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code
    
    if (!code) {
      return NextResponse.redirect('https://monadics.vercel.app', 302)
    }

    // Look up the original URL
    const originalUrl = urlStore.get(code)
    
    if (!originalUrl) {
      // If code not found, redirect to home page
      return NextResponse.redirect('https://monadics.vercel.app', 302)
    }

    // Redirect to the original URL
    return NextResponse.redirect(originalUrl, 302)
  } catch (error) {
    console.error('Error redirecting short URL:', error)
    return NextResponse.redirect('https://monadics.vercel.app', 302)
  }
} 