import { getAllPosts } from '@/lib/blog'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const allPosts = getAllPosts()
    const latestPosts = allPosts.slice(0, 3).map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      categorySlug: post.categorySlug
    }))
    
    return NextResponse.json(latestPosts)
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
} 