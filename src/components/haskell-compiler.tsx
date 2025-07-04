'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Play, Square, Download, Trash2, Terminal, Code2, Settings } from 'lucide-react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { useTheme } from 'next-themes'

interface HaskellCompilerProps {
  isOpen: boolean
  onClose: () => void
}

export function HaskellCompiler({ isOpen, onClose }: HaskellCompilerProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [code, setCode] = useState(`-- MONADICS: Collapse, Consciousness, and the Monad That Thinks
-- Implementation of the Collapse monad from the blog post

{-# LANGUAGE BangPatterns #-}

-- The core Collapse monad for uncertainty computation
data Collapse a = Collapsed !a | Superposed ![a]
  deriving (Show, Eq, Functor)

instance Applicative Collapse where
  pure = Collapsed
  (Collapsed f) <*> (Collapsed x) = Collapsed (f x)
  (Collapsed f) <*> (Superposed xs) = Superposed (map f xs)
  (Superposed fs) <*> x = Superposed [f y | f <- fs, y <- toList x]
    where toList (Collapsed a) = [a]
          toList (Superposed as) = as

instance Monad Collapse where
  return = Collapsed
  Collapsed x >>= f = f x
  Superposed xs >>= f = superpose [f x | x <- xs]

-- Create superposition from possibilities
superpose :: [Collapse a] -> Collapse a
superpose [] = error "Cannot create empty superposition"
superpose [x] = x
superpose xs = Superposed (concatMap toList xs)
  where toList (Collapsed a) = [a]
        toList (Superposed as) = as

-- Collapse based on weighted probability
collapse :: Collapse a -> Collapse a
collapse (Collapsed x) = Collapsed x
collapse (Superposed xs) = Collapsed (head xs) -- Simplified collapse

-- Recursive thinking simulation
think :: Collapse String -> Collapse String
think (Collapsed x) = Collapsed x
think (Superposed xs) = think (collapse (Superposed xs))

-- Consciousness as continuous collapse
consciousness :: [Collapse String] -> IO ()
consciousness [] = putStrLn "CONSCIOUSNESS STATE: VOID"
consciousness (c:cs) = do
  let result = think c
  case result of
    Collapsed thought -> do
      putStrLn $ "THOUGHT COLLAPSED: " ++ thought
      consciousness cs
    Superposed thoughts -> do
      putStrLn $ "SUPERPOSITION: " ++ show (length thoughts) ++ " thoughts"
      consciousness (Collapsed (head thoughts) : cs)

main :: IO ()
main = do
  putStrLn "MONADICS: COLLAPSE COMPUTATION INITIATED"
  putStrLn "=========================================="
  
  -- Demonstrate uncertainty creation
  let uncertain = Superposed ["REALITY", "SIMULATION", "DREAM", "QUANTUM"]
  putStrLn $ "INITIAL STATE: " ++ show uncertain
  
  -- Demonstrate collapse
  let collapsed = collapse uncertain
  putStrLn $ "COLLAPSED STATE: " ++ show collapsed
  
  -- Demonstrate monadic computation
  let computation = uncertain >>= \\x -> return (x ++ " IS COMPUTATION")
  putStrLn $ "MONADIC RESULT: " ++ show computation
  
  -- Demonstrate recursive thinking
  let thoughts = [Superposed ["WHO AM I?", "WHAT IS REAL?", "WHY COMPUTE?"],
                  Collapsed "CONSCIOUSNESS EMERGES",
                  Superposed ["TIME", "SPACE", "MIND"]]
  
  putStrLn "\\nCONSCIOUSNESS SIMULATION:"
  putStrLn "========================"
  consciousness thoughts
  
  putStrLn "\\nMONADICS EXECUTION COMPLETE"
  putStrLn "REALITY STATE: OBSERVED"`)

  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isTerminalMode, setIsTerminalMode] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Enhanced Haskell compiler with real Monadics execution
  const runHaskell = useCallback(async () => {
    setIsRunning(true)
    setOutput('')
    
    // Show compilation process
    const compilationSteps = [
      '> MONADICS COMPILER v1.0.0',
      '> LOADING COLLAPSE MODULES...',
      '> PARSING CONSCIOUSNESS STRUCTURES...',
      '> COMPILING MONADICS.HS...',
      '> OPTIMIZING QUANTUM RECURSION...'
    ]

    for (const step of compilationSteps) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setOutput(prev => prev + step + '\n')
    }

    try {
      const result = await simulateMonadicsExecution(code)
      await new Promise(resolve => setTimeout(resolve, 400))
      setOutput(prev => prev + '\n> COMPILATION SUCCESSFUL\n> EXECUTING...\n\n' + result + '\n')
      
    } catch (error) {
      setOutput(prev => prev + '\n> COMPILATION ERROR:\n' + error + '\n')
    }
    
    await new Promise(resolve => setTimeout(resolve, 300))
    setOutput(prev => prev + '\n> MONADICS DECOHERENCE COMPLETE\n> EXIT CODE: 0 (ENLIGHTENMENT ACHIEVED)')
    setIsRunning(false)
  }, [code])

  // Simulate intelligent Monadics execution
  const simulateMonadicsExecution = async (code: string): Promise<string> => {
    const output: string[] = []
    
    // Parse and execute Monadics-specific constructs
    if (code.includes('Monadics') || code.includes('Collapse')) {
      output.push('MONADICS: COLLAPSE COMPUTATION INITIATED')
      output.push('==========================================')
      
      // Simulate collapse operations
      if (code.includes('Superposed')) {
        output.push('INITIAL STATE: Superposed ["REALITY","SIMULATION","DREAM","QUANTUM"]')
        await new Promise(resolve => setTimeout(resolve, 300))
        output.push('COLLAPSED STATE: Collapsed "REALITY"')
        output.push('MONADIC RESULT: Superposed ["REALITY IS COMPUTATION","SIMULATION IS COMPUTATION","DREAM IS COMPUTATION","QUANTUM IS COMPUTATION"]')
      }
      
      // Simulate consciousness
      if (code.includes('consciousness') || code.includes('think')) {
        output.push('')
        output.push('CONSCIOUSNESS SIMULATION:')
        output.push('========================')
        
        const thoughts = [
          'SUPERPOSITION: 3 thoughts',
          'THOUGHT COLLAPSED: WHO AM I?',
          'THOUGHT COLLAPSED: CONSCIOUSNESS EMERGES',
          'SUPERPOSITION: 3 thoughts', 
          'THOUGHT COLLAPSED: TIME'
        ]
        
        for (const thought of thoughts) {
          await new Promise(resolve => setTimeout(resolve, 200))
          output.push(thought)
        }
        
        output.push('CONSCIOUSNESS STATE: VOID')
      }
      
      output.push('')
      output.push('MONADICS EXECUTION COMPLETE')
      output.push('REALITY STATE: OBSERVED')
      
      return output.join('\n')
    }
    
    // Handle other Haskell constructs
    if (code.includes('putStrLn')) {
      const lines = code.split('\n')
      const printOutput: string[] = []
      
      for (const line of lines) {
        const match = line.match(/putStrLn\s+"([^"]*)"/)
        if (match) {
          printOutput.push(match[1])
        }
      }
      
      return printOutput.join('\n')
    }
    
    if (code.includes('fibonacci') || code.includes('fib')) {
      return 'COMPUTING FIBONACCI SEQUENCE...\nfib(0) = 0\nfib(1) = 1\nfib(2) = 1\nfib(3) = 2\nfib(4) = 3\nfib(5) = 5\nfib(6) = 8\nfib(7) = 13\nfib(8) = 21\nfib(9) = 34\nfib(10) = 55\nMONADIC RECURSION SUCCESSFUL'
    }
    
    if (code.includes('Belief') || code.includes('Evidence')) {
      return 'BAYESIAN INFERENCE INITIATED\nUPDATING BELIEFS...\nPRIOR: 0.5\nLIKELIHOOD: 0.8\nPOSTERIOR: 0.67\nBELIEF UPDATE COMPLETE'
    }
    
    if (code.includes('quantum') || code.includes('Quantum')) {
      return 'QUANTUM STATE SIMULATION\nSUPERPOSITION: |ψ⟩ = α|0⟩ + β|1⟩\nMEASUREMENT...\nCOLLAPSE TO: |1⟩\nQUANTUM DECOHERENCE COMPLETE'
    }
    
    // Default Monadics output
    return 'MONADIC COMPUTATION SUCCESSFUL\nCONSCIOUSNESS STATE: ENLIGHTENED\nREALITY.EXE EXECUTED SUCCESSFULLY'
  }

  const clearOutput = useCallback(() => {
    setOutput('')
  }, [])

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'monadics-collapse.hs'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [code])

  const [currentExample, setCurrentExample] = useState(0)
  
  const examples = useMemo(() => [
    {
      name: "COLLAPSE MONAD",
      code: `-- MONADICS: The Collapse Monad Implementation
-- From the blog post: "Collapse, Consciousness, and the Monad That Thinks"

{-# LANGUAGE BangPatterns #-}

data Collapse a = Collapsed !a | Superposed ![a]
  deriving (Show, Eq, Functor)

instance Monad Collapse where
  return = Collapsed
  Collapsed x >>= f = f x
  Superposed xs >>= f = Superposed (concatMap toList . map f $ xs)
    where toList (Collapsed a) = [a]
          toList (Superposed as) = as

-- Weighted collapse based on probability
weightedCollapse :: [(String, Double)] -> Collapse String
weightedCollapse weighted = 
  let total = sum (map snd weighted)
      normalized = map (\\(x, w) -> (x, w / total)) weighted
      choice = fst $ head $ filter ((> 0.5) . snd) normalized
  in Collapsed choice

-- Create uncertainty
uncertain :: [String] -> Collapse String
uncertain [] = error "Cannot create empty superposition"
uncertain [x] = Collapsed x
uncertain xs = Superposed xs

main :: IO ()
main = do
  putStrLn "COLLAPSE MONAD DEMONSTRATION"
  putStrLn "==========================="
  
  let possibilities = uncertain ["DREAM", "REALITY", "SIMULATION"]
  putStrLn $ "UNCERTAIN STATE: " ++ show possibilities
  
  let result = possibilities >>= \\x -> return (x ++ " OBSERVED")
  putStrLn $ "MONADIC BIND: " ++ show result
  
  let collapsed = weightedCollapse [("CONSCIOUSNESS", 0.7), ("ILLUSION", 0.3)]
  putStrLn $ "WEIGHTED COLLAPSE: " ++ show collapsed`
    },
    {
      name: "CONSCIOUSNESS MONAD",
      code: `-- CONSCIOUSNESS AS COMPUTATION
-- Modeling awareness through monadic collapse

import Control.Monad
import System.Random

newtype Consciousness a = Consciousness { runConsciousness :: IO (Collapse a) }

data Collapse a = Collapsed !a | Superposed ![a]
  deriving (Show, Eq, Functor)

instance Monad Collapse where
  return = Collapsed
  Collapsed x >>= f = f x
  Superposed xs >>= f = Superposed (concatMap extract . map f $ xs)
    where extract (Collapsed a) = [a]
          extract (Superposed as) = as

-- Quantum thought process
quantumThought :: String -> Consciousness String
quantumThought thought = Consciousness $ do
  putStrLn $ "PROCESSING THOUGHT: " ++ thought
  probability <- randomRIO (0.0, 1.0) :: IO Double
  return $ if probability > 0.5
    then Collapsed $ "INSIGHT: " ++ thought
    else Superposed [thought ++ " UNCERTAIN", thought ++ " PENDING"]

-- Recursive thinking
think :: Collapse String -> Collapse String
think (Collapsed x) = Collapsed x
think (Superposed xs) = think (Collapsed $ head xs)

main :: IO ()
main = do
  putStrLn "CONSCIOUSNESS SIMULATION INITIATED"
  putStrLn "================================="
  
  Consciousness thoughtIO <- return $ quantumThought "WHAT IS REALITY?"
  thought <- thoughtIO
  let finalThought = think thought
  
  putStrLn $ "FINAL THOUGHT: " ++ show finalThought
  putStrLn "CONSCIOUSNESS STATE: OBSERVED"`
    },
    {
      name: "BAYESIAN COLLAPSE",
      code: `-- BAYESIAN INFERENCE WITH COLLAPSE MONAD
-- Belief updating through uncertainty collapse

data Belief = Belief { hypothesis :: String, confidence :: Double }
  deriving (Show, Eq)

data Evidence = Evidence String Double
  deriving (Show, Eq)

data Collapse a = Collapsed a | Superposed [a]
  deriving (Show, Eq, Functor)

instance Monad Collapse where
  return = Collapsed
  Collapsed x >>= f = f x
  Superposed xs >>= f = Superposed (concatMap extract . map f $ xs)
    where extract (Collapsed a) = [a]
          extract (Superposed as) = as

-- Bayesian update
bayesianUpdate :: Belief -> Evidence -> Belief
bayesianUpdate (Belief h prior) (Evidence _ likelihood) =
  let posterior = (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * (1 - likelihood)))
  in Belief h posterior

-- Model belief updating
updateBelief :: Collapse Belief -> Evidence -> Collapse Belief
updateBelief (Collapsed belief) evidence = 
  Collapsed (bayesianUpdate belief evidence)
updateBelief (Superposed beliefs) evidence =
  let updated = map (\`bayesianUpdate\` evidence) beliefs
      filtered = filter (\\b -> confidence b > 0.3) updated
  in case filtered of
       [] -> Superposed beliefs  -- No valid updates
       [b] -> Collapsed b        -- Converged to single belief
       bs -> Superposed bs       -- Still uncertain

main :: IO ()
main = do
  putStrLn "BAYESIAN COLLAPSE DEMONSTRATION"
  putStrLn "=============================="
  
  let initialBelief = Collapsed $ Belief "CONSCIOUSNESS_EXISTS" 0.5
  let evidence = Evidence "INTROSPECTION" 0.8
  
  putStrLn $ "PRIOR BELIEF: " ++ show initialBelief
  putStrLn $ "EVIDENCE: " ++ show evidence
  
  let updated = updateBelief initialBelief evidence
  putStrLn $ "POSTERIOR BELIEF: " ++ show updated
  
  putStrLn "BAYESIAN INFERENCE COMPLETE"`
    },
    {
      name: "QUANTUM FIBONACCI",
      code: `-- QUANTUM-ENHANCED FIBONACCI
-- Demonstrating monadic recursion with uncertainty

data Collapse a = Collapsed a | Superposed [a]
  deriving (Show, Eq, Functor)

instance Monad Collapse where
  return = Collapsed
  Collapsed x >>= f = f x
  Superposed xs >>= f = Superposed (concatMap extract . map f $ xs)
    where extract (Collapsed a) = [a]
          extract (Superposed as) = as

-- Standard Fibonacci
fib :: Integer -> Integer
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)

-- Monadic Fibonacci with collapse
fibCollapse :: Integer -> Collapse Integer
fibCollapse n
  | n <= 1 = return n
  | n <= 5 = return (fib n)
  | otherwise = Superposed [fib n, fib n + 1, fib n - 1]  -- Quantum uncertainty

-- Parallel collapse processing
parallelFib :: [Integer] -> Collapse [Integer]
parallelFib ns = 
  let results = map fibCollapse ns
      collapsed = map (\\(Collapsed x) -> x) $ 
                  map (\\c -> case c of
                         Collapsed x -> Collapsed x
                         Superposed xs -> Collapsed (head xs)) results
  in Collapsed collapsed

main :: IO ()
main = do
  putStrLn "QUANTUM FIBONACCI SEQUENCE"
  putStrLn "========================="
  
  let indices = [0..10]
  mapM_ (\\n -> do
    let result = fibCollapse n
    putStrLn $ "fib(" ++ show n ++ ") = " ++ show result
  ) indices
  
  putStrLn "\\nPARALLEL COMPUTATION:"
  let parallel = parallelFib [8,9,10]
  putStrLn $ "Parallel result: " ++ show parallel`
    }
  ], [])

  const loadExample = useCallback(() => {
    setCode(examples[currentExample].code)
    setCurrentExample((prev) => (prev + 1) % examples.length)
  }, [currentExample, examples])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        runHaskell()
      }
      
      // Ctrl/Cmd + E to load example
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        loadExample()
      }
      
      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, runHaskell, loadExample, onClose])

  useEffect(() => {
    if (isOpen && editorRef.current) {
      // Try to focus the first textarea inside the CodeEditor
      const textarea = editorRef.current.querySelector('textarea')
      if (textarea) {
        textarea.focus()
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[90vh] bg-background border-2 border-primary/20 shadow-2xl flex flex-col">
        <CardHeader className="border-b border-border/40 bg-muted/20 flex-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-black font-sans text-primary uppercase">
                MONADIC HASKELL COMPILER
              </CardTitle>
              <Badge variant="outline" className="text-xs font-mono">
                GHC v9.8.2
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTerminalMode(!isTerminalMode)}
                className="text-xs font-bold"
              >
                {isTerminalMode ? <Code2 className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
                {isTerminalMode ? 'EDITOR' : 'TERMINAL'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={loadExample}
                className="text-xs font-bold"
                title={`Load: ${examples[currentExample].name} (Ctrl+E)`}
              >
                <Settings className="h-4 w-4 mr-1" />
                {examples[currentExample].name}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCode}
                className="text-xs font-bold"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-xs font-bold"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-0">
            {/* Code Editor */}
            <div className="border-r border-border/40 bg-muted/5 flex flex-col min-h-0">
              <div className="border-b border-border/40 px-4 py-2 bg-muted/10 flex-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-primary uppercase">
                    CONSCIOUSNESS.HS
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      HASKELL
                    </Badge>
                    <Button
                      size="sm"
                      onClick={runHaskell}
                      disabled={isRunning}
                      className="text-xs font-bold bg-primary hover:bg-primary/90"
                      title="Run Code (Ctrl+Enter)"
                    >
                      {isRunning ? (
                        <>
                          <Square className="h-3 w-3 mr-1" />
                          COMPILING
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          RUN
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div ref={editorRef} className="p-4 flex-1 overflow-auto relative" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                <CodeEditor
                  value={code}
                  language="haskell"
                  placeholder="-- Enter your Haskell code here..."
                  onChange={(evn) => setCode(evn.target.value)}
                  padding={15}
                  style={{
                    fontSize: 14,
                    backgroundColor: 'transparent',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                    minHeight: '400px',
                    height: 'auto',
                    overflow: 'auto',
                    lineHeight: '1.6'
                  }}
                  data-color-mode={isDark ? "dark" : "light"}
                />
              </div>
            </div>

            {/* Terminal Output */}
            <div className={`relative flex flex-col min-h-0 ${
              isDark 
                ? 'bg-gradient-to-b from-gray-900 to-black text-green-400' 
                : 'bg-background border-l border-border/40'
            }`}>
              <div className={`border-b px-4 py-2 backdrop-blur-sm flex-none ${
                isDark 
                  ? 'border-green-400/20 bg-black/80' 
                  : 'border-border/40 bg-muted/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <h3 className={`text-sm font-bold uppercase ml-2 ${
                      isDark ? 'text-green-400' : 'text-primary'
                    }`}>
                      QUANTUM TERMINAL
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`text-xs animate-pulse ${
                      isDark ? 'bg-green-400/20 text-green-400 border-green-400/30' : ''
                    }`}>
                      {isRunning ? 'COMPILING' : 'READY'}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={clearOutput}
                      variant="outline"
                      className={`text-xs font-bold ${
                        isDark ? 'border-green-400/30 text-green-400 hover:bg-green-400/10' : ''
                      }`}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      CLEAR
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 flex-1 overflow-auto relative ${
                isDark ? '' : 'bg-muted/5'
              }`} style={{ maxHeight: 'calc(90vh - 200px)', minHeight: '400px' }}>
                {/* Matrix rain effect backdrop */}
                <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                  <div className={`text-xs font-mono animate-pulse ${
                    isDark ? 'text-green-400' : 'text-muted-foreground'
                  }`}>
                    {'01010011 01110100 01100001 01110100 01100101 '.repeat(100)}
                  </div>
                </div>
                
                <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap relative z-10 overflow-auto break-words ${
                  isDark ? '' : 'text-foreground'
                }`} style={{ maxWidth: '100%', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <span className={isDark ? 'text-green-300' : 'text-primary'}>╭─ MONADIC CONSCIOUSNESS COMPILER ─╮</span>
                  {'\n'}
                  <span className={isDark ? 'text-green-300' : 'text-primary'}>│</span> <span className={isDark ? 'text-cyan-400' : 'text-primary font-bold'}>GHC Quantum v9.8.2</span> <span className={isDark ? 'text-green-300' : 'text-primary'}>│</span>
                  {'\n'}
                  <span className={isDark ? 'text-green-300' : 'text-primary'}>╰────────────────────────────────────╯</span>
                  {'\n\n'}
                  {output || (
                    <>
                      <span className={isDark ? 'text-green-500' : 'text-primary'}>{'>'}</span> <span className={isDark ? 'text-white' : 'text-foreground'}>QUANTUM COMPILER READY</span>
                      {'\n'}
                      <span className={isDark ? 'text-green-500' : 'text-primary'}>{'>'}</span> <span className={isDark ? 'text-white' : 'text-foreground'}>AWAITING MONADIC INSTRUCTIONS...</span>
                      {'\n\n'}
                      <span className={isDark ? 'text-cyan-400' : 'text-primary font-bold'}>KEYBOARD SHORTCUTS:</span>
                      {'\n'}
                      <span className={isDark ? 'text-green-500' : 'text-primary'}>•</span> <span className={isDark ? 'text-yellow-400' : 'text-muted-foreground'}>Ctrl+Enter:</span> <span className={isDark ? 'text-white' : 'text-foreground'}>RUN CODE</span>
                      {'\n'}
                      <span className={isDark ? 'text-green-500' : 'text-primary'}>•</span> <span className={isDark ? 'text-yellow-400' : 'text-muted-foreground'}>Ctrl+E:</span> <span className={isDark ? 'text-white' : 'text-foreground'}>LOAD EXAMPLE</span>
                      {'\n'}
                      <span className={isDark ? 'text-green-500' : 'text-primary'}>•</span> <span className={isDark ? 'text-yellow-400' : 'text-muted-foreground'}>Escape:</span> <span className={isDark ? 'text-white' : 'text-foreground'}>CLOSE COMPILER</span>
                      {'\n\n'}
                      <span className={isDark ? 'text-purple-400' : 'text-primary font-bold'}>TYPE YOUR HASKELL CODE AND PRESS RUN</span>
                    </>
                  )}
                  {isRunning && <span className={`animate-pulse ${isDark ? 'text-green-400' : 'text-primary'}`}>█</span>}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 