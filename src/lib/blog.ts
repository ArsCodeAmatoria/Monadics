import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface BlogPost {
  slug: string
  title: string
  author: string
  date: string
  tags: string[]
  content: string
  excerpt?: string
  thumbnail?: string
  video?: string
  category?: string
  categorySlug?: string
}

export interface Category {
  slug: string
  name: string
  description: string
  posts: BlogPost[]
}

export const CATEGORIES = {
  'quantum-consciousness': {
    name: 'Quantum Consciousness',
    description: 'Exploring the intersection of quantum mechanics and consciousness theory'
  },
  'monadic-programming': {
    name: 'Monadic Programming', 
    description: 'Functional programming paradigms and monadic computation patterns'
  },
  'theoretical-physics': {
    name: 'Theoretical Physics',
    description: 'Advanced physics concepts and mathematical frameworks'
  },
  'philosophy': {
    name: 'Philosophy',
    description: 'Philosophical explorations of consciousness, computation, and reality'
  }
}

export function getAllPosts(): BlogPost[] {
  try {
    const allPosts: BlogPost[] = []

    // Read posts from root directory (for backward compatibility)
    const rootFiles = fs.readdirSync(postsDirectory)
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => ({
        fileName,
        category: undefined,
        categorySlug: undefined
      }))

    // Read posts from category directories
    const categoryPosts: Array<{fileName: string, category: string, categorySlug: string}> = []
    
    Object.keys(CATEGORIES).forEach(categorySlug => {
      const categoryPath = path.join(postsDirectory, categorySlug)
      if (fs.existsSync(categoryPath)) {
        const categoryFiles = fs.readdirSync(categoryPath)
          .filter(fileName => fileName.endsWith('.mdx'))
          .map(fileName => ({
            fileName,
            category: CATEGORIES[categorySlug as keyof typeof CATEGORIES].name,
            categorySlug
          }))
        categoryPosts.push(...categoryFiles)
      }
    })

    // Process all posts
    const allFiles = [...rootFiles, ...categoryPosts]
    
    allFiles.forEach(({ fileName, category, categorySlug }) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = categorySlug 
        ? path.join(postsDirectory, categorySlug, fileName)
        : path.join(postsDirectory, fileName)
      
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Extract excerpt from first paragraph
      const excerpt = content
        .replace(/^#{1,6}\s+.*$/gm, '') // Remove headings
        .replace(/\$\$[\s\S]*?\$\$/g, '') // Remove math blocks
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .split('\n')
        .find(line => line.trim().length > 0)
        ?.substring(0, 150) + '...'

      allPosts.push({
        slug,
        content,
        excerpt,
        category,
        categorySlug,
        ...(data as Omit<BlogPost, 'slug' | 'content' | 'excerpt' | 'category' | 'categorySlug'>),
      })
    })

    return allPosts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string, categorySlug?: string): BlogPost | null {
  try {
    let fullPath: string
    let category: string | undefined
    let resolvedCategorySlug: string | undefined

    if (categorySlug) {
      // Direct category/slug access
      fullPath = path.join(postsDirectory, categorySlug, `${slug}.mdx`)
      category = CATEGORIES[categorySlug as keyof typeof CATEGORIES]?.name
      resolvedCategorySlug = categorySlug
    } else {
      // Search for post in all locations (backward compatibility)
      const allPosts = getAllPosts()
      const post = allPosts.find(p => p.slug === slug)
      if (!post) return null
      
      if (post.categorySlug) {
        fullPath = path.join(postsDirectory, post.categorySlug, `${slug}.mdx`)
        category = post.category
        resolvedCategorySlug = post.categorySlug
      } else {
        fullPath = path.join(postsDirectory, `${slug}.mdx`)
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      category,
      categorySlug: resolvedCategorySlug,
      ...(data as Omit<BlogPost, 'slug' | 'content' | 'category' | 'categorySlug'>),
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const allTags = posts.flatMap(post => post.tags || [])
  return Array.from(new Set(allTags))
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post => post.tags?.includes(tag))
}

export function getAllCategories(): Category[] {
  const posts = getAllPosts()
  
  return Object.entries(CATEGORIES).map(([slug, config]) => ({
    slug,
    name: config.name,
    description: config.description,
    posts: posts.filter(post => post.categorySlug === slug)
  })).filter(category => category.posts.length > 0)
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post => post.categorySlug === categorySlug)
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts()
  
  // First priority: Same category
  let related = allPosts.filter(post => 
    post.slug !== currentPost.slug && 
    post.categorySlug === currentPost.categorySlug
  )
  
  // Second priority: Shared tags
  if (related.length < limit && currentPost.tags) {
    const tagMatches = allPosts.filter(post => 
      post.slug !== currentPost.slug &&
      post.categorySlug !== currentPost.categorySlug &&
      post.tags?.some(tag => currentPost.tags?.includes(tag))
    )
    related = [...related, ...tagMatches]
  }
  
  // Third priority: Most recent posts
  if (related.length < limit) {
    const recent = allPosts.filter(post => 
      post.slug !== currentPost.slug &&
      !related.some(r => r.slug === post.slug)
    )
    related = [...related, ...recent]
  }
  
  return related.slice(0, limit)
}

export function generateLinkWheel(currentPost: BlogPost): Array<{
  title: string
  posts: BlogPost[]
}> {
  const linkWheel = []
  
  // Category wheel - posts in same category
  if (currentPost.categorySlug) {
    const categoryPosts = getPostsByCategory(currentPost.categorySlug)
      .filter(post => post.slug !== currentPost.slug)
      .slice(0, 3)
    
    if (categoryPosts.length > 0) {
      linkWheel.push({
        title: `More in ${currentPost.category}`,
        posts: categoryPosts
      })
    }
  }
  
  // Tag wheel - posts with shared tags
  if (currentPost.tags && currentPost.tags.length > 0) {
    const tagPosts = currentPost.tags.flatMap(tag => 
      getPostsByTag(tag).filter(post => 
        post.slug !== currentPost.slug &&
        post.categorySlug !== currentPost.categorySlug
      )
    )
    
    // Remove duplicates and limit
    const uniqueTagPosts = Array.from(
      new Map(tagPosts.map(post => [post.slug, post])).values()
    ).slice(0, 2)
    
    if (uniqueTagPosts.length > 0) {
      linkWheel.push({
        title: 'Related Explorations',
        posts: uniqueTagPosts
      })
    }
  }
  
  return linkWheel
}

export function getCategoryBreadcrumbs(categorySlug: string, postSlug?: string): Array<{
  name: string
  url: string
}> {
  const breadcrumbs = [
    { name: 'Home', url: '/' }
  ]
  
  if (categorySlug && CATEGORIES[categorySlug as keyof typeof CATEGORIES]) {
    breadcrumbs.push({
      name: CATEGORIES[categorySlug as keyof typeof CATEGORIES].name,
      url: `/category/${categorySlug}`
    })
  }
  
  if (postSlug) {
    const post = getPostBySlug(postSlug, categorySlug)
    if (post) {
      breadcrumbs.push({
        name: post.title,
        url: categorySlug ? `/${categorySlug}/${postSlug}` : `/${postSlug}`
      })
    }
  }
  
  return breadcrumbs
} 