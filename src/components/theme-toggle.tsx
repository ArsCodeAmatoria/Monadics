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
      <div className="w-16 h-10 bg-muted/30 rounded-lg animate-pulse" />
    )
  }

  const isLightOn = theme === 'light'

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="group relative focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-lg transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Light Switch Plate */}
      <div className="relative w-16 h-24 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg shadow-md border border-slate-300 dark:border-slate-600">
        
        {/* Switch Housing */}
        <div className="absolute inset-x-2 top-2 bottom-2 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-md shadow-inner border border-slate-200 dark:border-slate-700">
          
          {/* ON/OFF Labels */}
          <div className="absolute top-1 left-0 right-0 text-center">
            <span className={`text-[8px] font-bold transition-colors ${isLightOn ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
              ON
            </span>
          </div>
          <div className="absolute bottom-1 left-0 right-0 text-center">
            <span className={`text-[8px] font-bold transition-colors ${!isLightOn ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`}>
              OFF
            </span>
          </div>
          
          {/* Switch Toggle */}
          <div 
            className={`absolute left-1/2 w-8 h-6 -ml-4 bg-gradient-to-b transition-all duration-300 ease-out rounded-sm shadow-lg border ${
              isLightOn 
                ? 'top-2 from-slate-200 to-slate-300 dark:from-slate-300 dark:to-slate-400 border-slate-300 dark:border-slate-400' 
                : 'bottom-2 from-slate-300 to-slate-400 dark:from-slate-400 dark:to-slate-500 border-slate-400 dark:border-slate-500'
            }`}
          >
            {/* Toggle Screw Details */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
          </div>
          
          {/* LED Indicator */}
          <div className={`absolute top-1/2 right-1 w-1.5 h-1.5 -mt-0.75 rounded-full transition-all duration-300 ${
            isLightOn 
              ? 'bg-green-400 shadow-lg shadow-green-400/50' 
              : 'bg-slate-300 dark:bg-slate-600'
          }`}></div>
        </div>
        
        {/* Plate Screws */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm"></div>
      </div>
      
      {/* Hover Effect Glow */}
      <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </button>
  )
} 