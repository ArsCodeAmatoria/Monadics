export function calculateReadingTime(content: string): number {
  // Average reading speed is about 200-250 words per minute
  // We'll use 225 as a middle ground
  const wordsPerMinute = 225
  
  // Remove code blocks, math formulas, and other non-readable content
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\$\$[\s\S]*?\$\$/g, '') // Remove display math
    .replace(/\$[^$]*\$/g, '') // Remove inline math
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove emphasis
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  
  return Math.max(1, readingTime) // Minimum 1 minute
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 MIN READ'
  }
  return `${minutes} MIN READ`
} 