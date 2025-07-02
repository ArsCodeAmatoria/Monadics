import { getAllPosts, getAllCategories } from '@/lib/blog'

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'
  const posts = getAllPosts()
  const categories = getAllCategories()

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic blog post pages - prefer category URLs for categorized posts
  const postPages = posts.map((post) => {
    const url = post.categorySlug 
      ? `${siteUrl}/${post.categorySlug}/${post.slug}`
      : `${siteUrl}/${post.slug}`
    
    return {
      url,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }
  })

  // RSS feed
  const feeds = [
    {
      url: `${siteUrl}/rss.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...categoryPages, ...postPages, ...feeds]
} 