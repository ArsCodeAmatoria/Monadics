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
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
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

        return {
          slug,
          content,
          excerpt,
          ...(data as Omit<BlogPost, 'slug' | 'content' | 'excerpt'>),
        }
      })

    return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as Omit<BlogPost, 'slug' | 'content'>),
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