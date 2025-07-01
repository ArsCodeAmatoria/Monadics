import { Quote } from 'lucide-react'

interface InsightQuoteProps {
  author: string
  quote: string
  title?: string
  theme?: 'philosophy' | 'physics' | 'mathematics' | 'mystic' | 'literature'
}

export function InsightQuote({ 
  author, 
  quote, 
  title,
  theme = 'philosophy' 
}: InsightQuoteProps) {
  const themeColors = {
    philosophy: 'border-purple-500/20 bg-purple-500/5',
    physics: 'border-blue-500/20 bg-blue-500/5', 
    mathematics: 'border-green-500/20 bg-green-500/5',
    mystic: 'border-amber-500/20 bg-amber-500/5',
    literature: 'border-rose-500/20 bg-rose-500/5'
  }

  return (
    <div className={`my-8 relative rounded-lg border-l-4 p-6 ${themeColors[theme]}`}>
      <div className="flex items-start gap-4">
        <Quote className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
        <div className="flex-1">
          <blockquote className="text-lg font-medium leading-relaxed text-foreground mb-4">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <footer className="text-sm text-muted-foreground font-bold">
            — {author.toUpperCase()}
            {title && <span className="block text-xs mt-1 font-medium">{title.toUpperCase()}</span>}
          </footer>
        </div>
      </div>
    </div>
  )
} 