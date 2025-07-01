import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Github, Mail, Twitter, Rss, ArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-black text-primary font-sans">
            MONADICS
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-base font-bold hover:text-primary transition-colors"
            >
              ARTICLES
            </Link>
            <Link 
              href="/about" 
              className="text-base font-bold hover:text-primary transition-colors"
            >
              ABOUT
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border/40 mt-16 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Philosophy Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-black font-sans text-primary uppercase">
                PHILOSOPHY
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  CONSCIOUSNESS AS COMPUTATION. REALITY AS INFORMATION PROCESSING. 
                  MINDS AS MONADIC STRUCTURES EVOLVING THROUGH QUANTUM COHERENCE.
                </p>
                <div className="border-l-2 border-primary/20 pl-4">
                  <p className="text-xs text-muted-foreground font-medium italic">
                    &ldquo;I am the monad computing reality through quantum superposition 
                    until the moment of conscious observation collapses the wave function 
                    into experience.&rdquo;
                  </p>
                  <p className="text-xs text-muted-foreground font-bold mt-2">
                    &mdash; LUCI, MONADIC MIND
                  </p>
                </div>
              </div>
            </div>

            {/* Latest Articles Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-black font-sans text-primary uppercase">
                LATEST ARTICLES
              </h3>
              <div className="space-y-4">
                <Link 
                  href="/bayesian-inference-monad-minds"
                  className="block group"
                >
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase leading-tight">
                    BAYESIAN INFERENCE IN MONAD MINDS
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    January 2, 2025
                  </p>
                </Link>
                
                <Link 
                  href="/quantum-superposition-and-monads"
                  className="block group"
                >
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase leading-tight">
                    QUANTUM SUPERPOSITION AND THE MONADIC SELF
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    July 1, 2025
                  </p>
                </Link>

                <Link 
                  href="/"
                  className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase"
                >
                  ALL ARTICLES <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Topics Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-black font-sans text-primary uppercase">
                RESEARCH TOPICS
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "QUANTUM CONSCIOUSNESS",
                  "MONADS", 
                  "HASKELL",
                  "BAYESIAN INFERENCE",
                  "ORCH-OR",
                  "CONSCIOUSNESS",
                  "QUANTUM COMPUTING",
                  "MATHEMATICS",
                  "COMPUTATION",
                  "PHILOSOPHY"
                ].map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-2 py-1 text-xs font-bold bg-muted text-muted-foreground hover:bg-primary/10 transition-colors cursor-pointer rounded border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-4">
                <Link 
                  href="/rss.xml"
                  className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase"
                >
                  <Rss className="mr-2 h-3 w-3" />
                  RSS FEED
                </Link>
              </div>
            </div>

            {/* Connect Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-black font-sans text-primary uppercase">
                CONNECT
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-foreground mb-3 uppercase">
                    QUANTUM UPDATES
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 font-medium">
                    SUBSCRIBE TO RECEIVE NOTIFICATIONS WHEN NEW EXPLORATIONS 
                    OF CONSCIOUSNESS AND COMPUTATION ARE PUBLISHED.
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      type="email" 
                      placeholder="EMAIL ADDRESS"
                      className="flex-1 text-xs font-bold placeholder:text-muted-foreground/50 placeholder:font-bold placeholder:uppercase"
                    />
                    <Button 
                      size="sm" 
                      className="font-bold text-xs uppercase"
                    >
                      OBSERVE
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-foreground mb-3 uppercase">
                    DIRECT CONTACT
                  </p>
                  <div className="space-y-2">
                    <a
                      href="mailto:contact@monadics.dev"
                      className="flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="mr-2 h-3 w-3" />
                      CONTACT@MONADICS.DEV
                    </a>
                    <Link
                      href="/about"
                      className="flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowRight className="mr-2 h-3 w-3" />
                      ABOUT LUCI
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border/40 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-xs text-muted-foreground font-bold uppercase">
                <p>© 2025 MONADICS. EXPLORING CONSCIOUSNESS THROUGH COMPUTATION.</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="/rss.xml"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="RSS Feed"
                >
                  <Rss className="h-4 w-4" />
                  <span className="sr-only">RSS Feed</span>
                </a>
                <a
                  href="mailto:contact@monadics.dev"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 