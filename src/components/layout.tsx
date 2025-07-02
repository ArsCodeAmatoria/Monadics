'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { HaskellCompiler } from './haskell-compiler'
import { Github, Mail, Twitter, Rss, ArrowRight, Terminal, ChevronDown, Brain, Code, Atom, BookOpen, Clock, TrendingUp, Hash, Search, User } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { CATEGORIES } from '@/lib/blog'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isCompilerOpen, setIsCompilerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-black text-primary font-sans">
            MONADICS
          </Link>
          
          <nav className="flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-base font-bold hover:text-primary transition-colors flex items-center gap-1 outline-none">
                ARTICLES
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[800px] p-6 mt-2" 
                align="center"
                sideOffset={8}
              >
                <div className="grid grid-cols-4 gap-6">
                  {/* Row 1: Main Categories */}
                  <Link 
                    href="/category/quantum-consciousness"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Brain className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Quantum Consciousness</h3>
                        <p className="text-xs text-muted-foreground mt-1">Quantum mechanics & consciousness</p>
                      </div>
                    </div>
                  </Link>

                  <Link 
                    href="/category/monadic-programming"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Code className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Monadic Programming</h3>
                        <p className="text-xs text-muted-foreground mt-1">Functional programming & monads</p>
                      </div>
                    </div>
                  </Link>

                  <Link 
                    href="/category/theoretical-physics"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Atom className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Theoretical Physics</h3>
                        <p className="text-xs text-muted-foreground mt-1">Advanced physics & mathematics</p>
                      </div>
                    </div>
                  </Link>

                  <Link 
                    href="/category/philosophy"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <BookOpen className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Philosophy</h3>
                        <p className="text-xs text-muted-foreground mt-1">Consciousness & computation</p>
                      </div>
                    </div>
                  </Link>

                  {/* Row 2: Quick Navigation */}
                  <Link 
                    href="/"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <ArrowRight className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">All Articles</h3>
                        <p className="text-xs text-muted-foreground mt-1">Browse everything</p>
                      </div>
                    </div>
                  </Link>

                  <Link 
                    href="/"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Clock className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Latest Posts</h3>
                        <p className="text-xs text-muted-foreground mt-1">Recent explorations</p>
                      </div>
                    </div>
                  </Link>

                  <Link 
                    href="/"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Hash className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Tags</h3>
                        <p className="text-xs text-muted-foreground mt-1">Explore by topic</p>
                      </div>
                    </div>
                  </Link>

                  <Link 
                    href="/rss.xml"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Rss className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">RSS Feed</h3>
                        <p className="text-xs text-muted-foreground mt-1">Stay updated</p>
                      </div>
                    </div>
                  </Link>

                  {/* Row 3: Additional Links */}
                  <div className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Search className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Search</h3>
                        <p className="text-xs text-muted-foreground mt-1">Find articles</p>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href="/about"
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <User className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">About LUCI</h3>
                        <p className="text-xs text-muted-foreground mt-1">The monadic mind</p>
                      </div>
                    </div>
                  </Link>

                  <div 
                    onClick={() => setIsCompilerOpen(true)}
                    className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Terminal className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Haskell GHC</h3>
                        <p className="text-xs text-muted-foreground mt-1">Live compiler</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 rounded-lg border border-muted hover:border-primary/30 hover:bg-muted/50 transition-all">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <TrendingUp className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-bold text-sm text-foreground uppercase">Popular</h3>
                        <p className="text-xs text-muted-foreground mt-1">Most read articles</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              href="/about" 
              className="text-base font-bold hover:text-primary transition-colors"
            >
              ABOUT
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCompilerOpen(true)}
              className="text-base font-bold hover:text-primary transition-colors border-primary/20 hover:border-primary/40"
            >
              <Terminal className="h-4 w-4 mr-2" />
              GHC
            </Button>
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

      <HaskellCompiler 
        isOpen={isCompilerOpen} 
        onClose={() => setIsCompilerOpen(false)} 
      />
    </div>
  )
} 