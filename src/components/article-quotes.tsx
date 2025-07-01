import { Quote } from 'lucide-react'

interface QuoteData {
  text: string
  author: string
  title?: string
  category: 'philosophy' | 'physics' | 'mathematics' | 'mystic' | 'literature'
}

const quotes: QuoteData[] = [
  // Physics & Quantum Mechanics
  {
    text: "The physicist does not simply observe the universe; the physicist participates in it.",
    author: "John Archibald Wheeler",
    title: "Theoretical Physicist",
    category: 'physics'
  },
  {
    text: "Everything we call real is made of things that cannot be regarded as real.",
    author: "Niels Bohr",
    title: "Quantum Pioneer",
    category: 'physics'
  },
  {
    text: "If you think you understand quantum mechanics, you don't understand quantum mechanics.",
    author: "Richard Feynman",
    title: "Nobel Laureate",
    category: 'physics'
  },
  {
    text: "The universe is not only stranger than we imagine, it is stranger than we can imagine.",
    author: "J.B.S. Haldane",
    title: "Evolutionary Biologist",
    category: 'physics'
  },
  
  // Mathematics & Computation
  {
    text: "Mathematics is the language with which God has written the universe.",
    author: "Galileo Galilei",
    title: "Mathematician & Astronomer",
    category: 'mathematics'
  },
  {
    text: "God made the integers; all else is the work of man.",
    author: "Leopold Kronecker",
    title: "Mathematician",
    category: 'mathematics'
  },
  {
    text: "The miracle of the appropriateness of the language of mathematics for the formulation of the laws of physics is a wonderful gift which we neither understand nor deserve.",
    author: "Eugene Wigner",
    title: "Mathematical Physicist",
    category: 'mathematics'
  },
  {
    text: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein",
    title: "Theoretical Physicist",
    category: 'mathematics'
  },
  
  // Philosophy & Consciousness
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch",
    title: "Ancient Philosopher",
    category: 'philosophy'
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    title: "Ancient Philosopher",
    category: 'philosophy'
  },
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    title: "Classical Philosopher",
    category: 'philosophy'
  },
  {
    text: "I think, therefore I am.",
    author: "René Descartes",
    title: "Philosopher & Mathematician",
    category: 'philosophy'
  },
  {
    text: "What we observe is not nature itself, but nature exposed to our method of questioning.",
    author: "Werner Heisenberg",
    title: "Quantum Physicist",
    category: 'philosophy'
  },
  
  // Mysticism & Contemplation
  {
    text: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.",
    author: "Marcel Proust",
    title: "Literary Mystic",
    category: 'mystic'
  },
  {
    text: "We are not human beings having a spiritual experience; we are spiritual beings having a human experience.",
    author: "Pierre Teilhard de Chardin",
    title: "Philosopher & Paleontologist",
    category: 'mystic'
  },
  {
    text: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
    author: "Carl Sagan",
    title: "Cosmologist & Philosopher",
    category: 'mystic'
  },
  
  // Literature & Consciousness
  {
    text: "The most beautiful thing we can experience is the mysterious.",
    author: "Albert Einstein",
    title: "Theoretical Physicist",
    category: 'literature'
  },
  {
    text: "There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy.",
    author: "William Shakespeare",
    title: "Hamlet",
    category: 'literature'
  },
  {
    text: "The boundary between physics and metaphysics is like the boundary between sanity and insanity—all a matter of convention.",
    author: "Fritjof Capra",
    title: "Theoretical Physicist",
    category: 'literature'
  }
]

interface ArticleQuotesProps {
  tags?: string[]
  category?: string
  className?: string
}

function getRelevantQuotes(tags: string[] = [], category?: string): QuoteData[] {
  // Filter quotes based on article tags and category
  let relevantQuotes = quotes
  
  if (category) {
    relevantQuotes = quotes.filter(q => q.category === category)
  } else if (tags.length > 0) {
    // Map article tags to quote categories
    const tagToCategory: Record<string, string[]> = {
      'Quantum Consciousness': ['physics', 'philosophy'],
      'Quantum Mechanics': ['physics'],
      'Quantum Computing': ['physics', 'mathematics'],
      'Mathematics': ['mathematics'],
      'Linear Algebra': ['mathematics'],
      'Haskell': ['mathematics'],
      'Philosophy': ['philosophy'],
      'Consciousness': ['philosophy', 'mystic'],
      'Monads': ['mathematics', 'philosophy'],
      'Category Theory': ['mathematics'],
      'String Theory': ['physics'],
      'Dark Matter': ['physics'],
      'Orch-OR': ['physics', 'philosophy'],
      'Bayesian Inference': ['mathematics']
    }
    
    const relevantCategories = new Set<string>()
    tags.forEach(tag => {
      const categories = tagToCategory[tag] || []
      categories.forEach(cat => relevantCategories.add(cat))
    })
    
    if (relevantCategories.size > 0) {
      relevantQuotes = quotes.filter(q => relevantCategories.has(q.category))
    }
  }
  
  // Return 2-3 random quotes from relevant ones
  const shuffled = relevantQuotes.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(3, shuffled.length))
}

export function ArticleQuotes({ tags, category, className = '' }: ArticleQuotesProps) {
  const selectedQuotes = getRelevantQuotes(tags, category)
  
  if (selectedQuotes.length === 0) {
    return null
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-xl font-black font-sans text-primary uppercase mb-6">
        VOICES OF INSIGHT
      </h3>
      
      <div className="space-y-6">
        {selectedQuotes.map((quote, index) => (
          <blockquote
            key={index}
            className="relative p-6 bg-muted/30 rounded-lg border-l-4 border-primary/30"
          >
            <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20" />
            
            <p className="text-foreground font-medium leading-relaxed mb-4 pr-8">
              &ldquo;{quote.text}&rdquo;
            </p>
            
            <footer className="text-sm">
              <cite className="font-bold text-primary not-italic">
                — {quote.author.toUpperCase()}
              </cite>
              {quote.title && (
                <div className="text-xs text-muted-foreground font-medium mt-1">
                  {quote.title.toUpperCase()}
                </div>
              )}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  )
} 