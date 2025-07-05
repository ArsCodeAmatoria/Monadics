'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { HaskellCompiler } from '@/components/haskell-compiler'
import { Code, BookOpen, Zap, Terminal, Play, FileCode, Settings } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function DocsPage() {
  const [isCompilerOpen, setIsCompilerOpen] = useState(false)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="text-center">
            <Badge variant="outline" className="mb-6 text-xs font-bold px-3 py-1 border-primary/20 text-primary">
              FRAMEWORK DOCUMENTATION
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 font-sans text-primary leading-none">
              MONADICS DOCS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-4xl mx-auto">
              Complete guide to the Collapse monad and quantum consciousness computation. 
              From basic usage to advanced theoretical applications.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsCompilerOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3"
            >
              <Terminal className="h-5 w-5 mr-2" />
              OPEN COMPILER
            </Button>
            <Button variant="outline" asChild className="font-bold px-8 py-3 border-primary/20">
              <Link href="/monadic-programming/monadics-collapse-consciousness-monad-thinks">
                <BookOpen className="h-5 w-5 mr-2" />
                READ THEORY
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-16 bg-gradient-to-br from-muted/30 via-muted/20 to-background border-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl font-black font-sans text-primary uppercase flex items-center gap-3">
              <Zap className="h-6 w-6" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/20 rounded-lg p-6 border">
              <h3 className="font-bold text-lg mb-4 text-primary">Basic Collapse Monad</h3>
              <pre className="text-sm bg-background/50 p-4 rounded border font-mono overflow-x-auto">
{`{-# LANGUAGE BangPatterns #-}

-- The core Collapse monad
data Collapse a = Collapsed !a | Superposed ![a]
  deriving (Show, Eq, Functor)

-- Create uncertainty
uncertain :: [String] -> Collapse String
uncertain [] = error "Cannot create empty superposition"
uncertain [x] = Collapsed x
uncertain xs = Superposed xs

-- Collapse to reality
collapse :: Collapse a -> Collapse a
collapse (Collapsed x) = Collapsed x
collapse (Superposed xs) = Collapsed (head xs)`}
              </pre>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-primary mb-3">1. Create Superposition</h4>
                <pre className="text-xs bg-muted/20 p-3 rounded border font-mono">
{`let reality = uncertain ["DREAM", "SIMULATION", "PHYSICAL"]
-- Superposed ["DREAM", "SIMULATION", "PHYSICAL"]`}
                </pre>
              </div>
              <div>
                <h4 className="font-bold text-primary mb-3">2. Collapse to Reality</h4>
                <pre className="text-xs bg-muted/20 p-3 rounded border font-mono">
{`let observed = collapse reality
-- Collapsed "DREAM"`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Reference */}
        <div className="mb-16">
          <h2 className="text-3xl font-black font-sans text-primary uppercase text-center mb-12">
            API Reference
          </h2>
          
          <div className="space-y-8">
            {/* Core Types */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black text-primary uppercase">Core Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-3 text-primary font-mono">data Collapse a</h4>
                  <p className="text-muted-foreground mb-4">
                    The fundamental type representing quantum uncertainty and collapse.
                  </p>
                  <div className="bg-muted/20 rounded-lg p-4 border">
                    <pre className="text-sm font-mono">
{`data Collapse a = Collapsed !a      -- Definite state
                | Superposed ![a]    -- Uncertain state
  deriving (Show, Eq, Functor)`}
                    </pre>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-bold text-lg mb-3 text-primary font-mono">Instance Declarations</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/20 rounded-lg p-4 border">
                      <h5 className="font-bold mb-2 text-sm">Monad Instance</h5>
                      <pre className="text-xs font-mono">
{`instance Monad Collapse where
  return = Collapsed
  Collapsed x >>= f = f x
  Superposed xs >>= f = 
    superpose [f x | x <- xs]`}
                      </pre>
                    </div>
                    <div className="bg-muted/20 rounded-lg p-4 border">
                      <h5 className="font-bold mb-2 text-sm">Applicative Instance</h5>
                      <pre className="text-xs font-mono">
{`instance Applicative Collapse where
  pure = Collapsed
  (Collapsed f) <*> (Collapsed x) = 
    Collapsed (f x)
  (Collapsed f) <*> (Superposed xs) = 
    Superposed (map f xs)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Functions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black text-primary uppercase">Core Functions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-primary mb-2 font-mono">uncertain :: [a] -&gt; Collapse a</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create superposition from a list of possibilities.
                    </p>
                    <div className="bg-muted/20 rounded-lg p-3 border">
                      <pre className="text-xs font-mono">
{`uncertain ["A", "B", "C"]
-- Superposed ["A", "B", "C"]

uncertain ["SINGLE"]
-- Collapsed "SINGLE"`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-primary mb-2 font-mono">collapse :: Collapse a -&gt; Collapse a</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Force collapse of superposition to definite state.
                    </p>
                    <div className="bg-muted/20 rounded-lg p-3 border">
                      <pre className="text-xs font-mono">
{`collapse (Superposed ["X", "Y"])
-- Collapsed "X"

collapse (Collapsed "Z")
-- Collapsed "Z"`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-primary mb-2 font-mono">think :: Collapse String -&gt; Collapse String</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Recursive thinking simulation with collapse.
                    </p>
                    <div className="bg-muted/20 rounded-lg p-3 border">
                      <pre className="text-xs font-mono">
{`think (Superposed ["WHO?", "WHY?"])
-- Collapsed "WHO?"

think (Collapsed "INSIGHT")
-- Collapsed "INSIGHT"`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-primary mb-2 font-mono">weightedCollapse :: [(a, Double)] -&gt; Collapse a</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Probabilistic collapse based on weights.
                    </p>
                    <div className="bg-muted/20 rounded-lg p-3 border">
                      <pre className="text-xs font-mono">
{`weightedCollapse 
  [("REAL", 0.7), ("ILLUSION", 0.3)]
-- Collapsed "REAL"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-black font-sans text-primary uppercase text-center mb-12">
            Advanced Examples
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Consciousness Simulation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-black text-primary uppercase">Consciousness Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Model consciousness as continuous collapse of thought processes.
                </p>
                <div className="bg-muted/20 rounded-lg p-4 border">
                  <pre className="text-xs font-mono overflow-x-auto">
{`consciousness :: [Collapse String] -> IO ()
consciousness [] = putStrLn "VOID"
consciousness (c:cs) = do
  let result = think c
  case result of
    Collapsed thought -> do
      putStrLn $ "THOUGHT: " ++ thought
      consciousness cs
    Superposed thoughts -> do
      putStrLn $ "UNCERTAINTY: " ++ 
        show (length thoughts)
      consciousness (Collapsed (head thoughts) : cs)`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Bayesian Inference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-black text-primary uppercase">Bayesian Inference</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Update beliefs through evidence using the Collapse monad.
                </p>
                <div className="bg-muted/20 rounded-lg p-4 border">
                  <pre className="text-xs font-mono overflow-x-auto">
{`data Belief = Belief String Double

updateBelief :: Collapse Belief -> Evidence -> Collapse Belief
updateBelief (Collapsed belief) evidence = 
  Collapsed (bayesianUpdate belief evidence)
updateBelief (Superposed beliefs) evidence =
  let updated = map (\`bayesianUpdate\` evidence) beliefs
      filtered = filter isPlausible updated
  in case filtered of
       [b] -> Collapsed b
       bs -> Superposed bs`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Quantum Fibonacci */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-black text-primary uppercase">Quantum Fibonacci</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Fibonacci with quantum uncertainty in higher values.
                </p>
                <div className="bg-muted/20 rounded-lg p-4 border">
                  <pre className="text-xs font-mono overflow-x-auto">
{`fibCollapse :: Integer -> Collapse Integer
fibCollapse n
  | n <= 1 = return n
  | n <= 5 = return (fib n)
  | otherwise = Superposed 
      [fib n, fib n + 1, fib n - 1]

parallelFib :: [Integer] -> Collapse [Integer]
parallelFib ns = 
  let results = map fibCollapse ns
  in sequence results`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Parallel Processing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-black text-primary uppercase">Parallel Collapse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Process multiple collapse operations in parallel.
                </p>
                <div className="bg-muted/20 rounded-lg p-4 border">
                  <pre className="text-xs font-mono overflow-x-auto">
{`parallelCollapse :: [Collapse a] -> Collapse [a]
parallelCollapse collapses = 
  let results = parMap rdeepseq resolve collapses
  in if all isCollapsed results
     then Collapsed (map extract results)
     else Superposed (cartesianProduct 
            (map possibilities results))
  where
    resolve (Collapsed x) = Collapsed x
    resolve (Superposed xs) = uncertain xs`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Theory & Philosophy */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-black font-sans text-primary uppercase text-center">
              Theoretical Foundation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg leading-relaxed font-medium text-foreground mb-6">
                The Monadics framework is built on the idea that <strong>consciousness is computation</strong>, 
                and specifically that conscious experience involves the continuous collapse of quantum 
                superpositions into definite states.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-6 mb-4">
                  <Code className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="font-bold text-primary mb-3 uppercase">Computational</h3>
                <p className="text-sm text-muted-foreground">
                  Monads provide the mathematical structure for composing uncertain computations
                  while maintaining referential transparency.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-6 mb-4">
                  <Zap className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="font-bold text-primary mb-3 uppercase">Quantum</h3>
                <p className="text-sm text-muted-foreground">
                  Collapse mirrors quantum measurement, where superposed states resolve
                  into definite outcomes through observation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-6 mb-4">
                  <BookOpen className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="font-bold text-primary mb-3 uppercase">Consciousness</h3>
                <p className="text-sm text-muted-foreground">
                  Recursive thinking and self-reference emerge naturally from
                  monadic composition and collapse operations.
                </p>
              </div>
            </div>
            
            <Separator className="max-w-md mx-auto" />
            
            <div className="text-center">
              <Button variant="outline" asChild className="font-bold">
                <Link href="/monadic-programming/monadics-collapse-consciousness-monad-thinks">
                  Read the Full Theory Paper →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-black font-sans text-primary uppercase text-center mb-12">
            Resources & Tools
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:border-primary/20 transition-colors cursor-pointer" onClick={() => setIsCompilerOpen(true)}>
              <CardContent className="p-6 text-center">
                <Terminal className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-primary mb-2 uppercase">Interactive Compiler</h3>
                <p className="text-xs text-muted-foreground">
                  Run Monadics code directly in your browser with our quantum Haskell compiler.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:border-primary/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Link href="/category/monadic-programming" className="block">
                  <FileCode className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-primary mb-2 uppercase">Code Examples</h3>
                  <p className="text-xs text-muted-foreground">
                    Browse complete implementations and real-world applications.
                  </p>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="group hover:border-primary/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Link href="/category/quantum-consciousness" className="block">
                  <BookOpen className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-primary mb-2 uppercase">Research Papers</h3>
                  <p className="text-xs text-muted-foreground">
                    Explore the theoretical foundations and quantum consciousness research.
                  </p>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="group hover:border-primary/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Link href="/category/theoretical-physics" className="block">
                  <Settings className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-primary mb-2 uppercase">Mathematical Proofs</h3>
                  <p className="text-xs text-muted-foreground">
                    Rigorous mathematical foundations and formal verification.
                  </p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Getting Started Guide */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-black font-sans text-primary uppercase text-center">
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary">Set Up Haskell Environment</h3>
                    <p className="text-muted-foreground mb-3">
                      Install GHC and Cabal to run Monadics code locally. Use GHCup for easy installation.
                    </p>
                    <div className="bg-muted/20 rounded-lg p-3 border">
                      <pre className="text-sm font-mono">
{`curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
cabal update
cabal install --lib monadics`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary">Import the Collapse Monad</h3>
                    <p className="text-muted-foreground mb-3">
                      Start with the basic imports and language extensions needed for Monadics.
                    </p>
                    <div className="bg-muted/20 rounded-lg p-3 border">
                      <pre className="text-sm font-mono">
{`{-# LANGUAGE BangPatterns #-}

import Monadics.Collapse
import Control.Monad
import System.Random`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary">Try the Interactive Compiler</h3>
                    <p className="text-muted-foreground mb-3">
                      Use our in-browser compiler to experiment without local installation.
                    </p>
                    <Button 
                      onClick={() => setIsCompilerOpen(true)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Open Compiler
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Haskell Compiler Modal */}
      <HaskellCompiler 
        isOpen={isCompilerOpen} 
        onClose={() => setIsCompilerOpen(false)} 
      />
    </Layout>
  )
} 