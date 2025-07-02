'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-14 h-8 bg-muted/30 rounded-full animate-pulse border border-border/40" />
    )
  }

  const isLightOn = theme === 'light'

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="group relative focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-full transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Switch Housing - Realistic Toggle Switch */}
      <div className="relative w-14 h-8 bg-gradient-to-br from-background to-muted border-2 border-border/60 rounded-full shadow-inner transition-all duration-300 group-hover:border-primary/40">
        
        {/* Inner Track */}
        <div className={`absolute inset-1 rounded-full transition-all duration-300 shadow-inner ${
          isLightOn 
            ? 'bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30' 
            : 'bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900'
        }`}>
          
          {/* Track Labels */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <span className={`text-[7px] font-black transition-all duration-300 ${
              isLightOn 
                ? 'text-amber-600 dark:text-amber-400 opacity-100' 
                : 'text-muted-foreground/40 opacity-50'
            }`}>
              ON
            </span>
            <span className={`text-[7px] font-black transition-all duration-300 ${
              !isLightOn 
                ? 'text-slate-600 dark:text-slate-400 opacity-100' 
                : 'text-muted-foreground/40 opacity-50'
            }`}>
              OFF
            </span>
          </div>
        </div>
        
        {/* Switch Toggle Handle */}
        <div 
          className={`absolute top-1 w-6 h-6 bg-gradient-to-br from-background to-muted border-2 border-border rounded-full shadow-lg transition-all duration-300 ease-out group-hover:shadow-xl ${
            isLightOn 
              ? 'left-7 border-primary/30' 
              : 'left-1 border-muted-foreground/30'
          }`}
        >
          {/* Handle Surface Detail */}
          <div className="absolute inset-0.5 bg-gradient-to-br from-background via-muted/50 to-muted rounded-full">
            {/* Center Dot */}
            <div className={`absolute top-1/2 left-1/2 w-1 h-1 -mt-0.5 -ml-0.5 rounded-full transition-all duration-300 ${
              isLightOn 
                ? 'bg-amber-400 shadow-sm shadow-amber-400/50' 
                : 'bg-muted-foreground/60'
            }`}></div>
            
            {/* Grip Lines */}
            <div className="absolute top-1/2 left-1/2 -mt-2 -ml-1.5 w-3 h-4 flex flex-col justify-center space-y-0.5">
              <div className="w-full h-[1px] bg-muted-foreground/20 rounded-full"></div>
              <div className="w-full h-[1px] bg-muted-foreground/20 rounded-full"></div>
              <div className="w-full h-[1px] bg-muted-foreground/20 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Power Indicator LED */}
        <div className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
          isLightOn 
            ? 'bg-green-400 shadow-md shadow-green-400/60 animate-pulse' 
            : 'bg-muted-foreground/30'
        }`}></div>
      </div>
      
      {/* Accessibility Label */}
      <span className="sr-only">
        {isLightOn ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
      
      {/* Subtle Hover Glow */}
      <div className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -m-1"></div>
    </button>
  )
} 