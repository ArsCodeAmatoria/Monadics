'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Badge } from './badge'
import { 
  ArrowDown, 
  ArrowRight, 
  ArrowUpDown, 
  GitBranch, 
  Cpu, 
  Database, 
  Layers, 
  Code, 
  Terminal, 
  Brain,
  Monitor,
  Server,
  Zap,
  Globe,
  Cog,
  Microscope,
  Activity,
  CircuitBoard,
  CloudLightning,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DiagramNode {
  id: string
  label: string
  description?: string
  type?: 'input' | 'process' | 'output' | 'decision' | 'data' | 'hardware' | 'software'
  icon?: React.ReactNode
  color?: string
}

interface ArchitectureLayerProps {
  title: string
  description?: string
  components: string[]
  color?: string
  icon?: React.ReactNode
}

interface FlowDiagramProps {
  title?: string
  nodes: DiagramNode[]
  direction?: 'vertical' | 'horizontal'
  className?: string
}

interface ArchitectureStackProps {
  title?: string
  layers: ArchitectureLayerProps[]
  className?: string
}

// Enhanced color schemes with gradients and shadows
const getColorScheme = (color: string) => {
  const schemes = {
    primary: {
      bg: 'bg-gradient-to-br from-blue-50/80 to-indigo-100/60 dark:from-blue-950/40 dark:to-indigo-950/30',
      border: 'border-blue-200/60 dark:border-blue-800/50',
      text: 'text-blue-900 dark:text-blue-100',
      shadow: 'shadow-blue-500/10 dark:shadow-blue-400/5',
      glow: 'shadow-lg shadow-blue-500/20 dark:shadow-blue-400/10'
    },
    secondary: {
      bg: 'bg-gradient-to-br from-slate-50/80 to-slate-100/60 dark:from-slate-950/40 dark:to-slate-900/30',
      border: 'border-slate-200/60 dark:border-slate-700/50',
      text: 'text-slate-900 dark:text-slate-100',
      shadow: 'shadow-slate-500/10 dark:shadow-slate-400/5',
      glow: 'shadow-lg shadow-slate-500/20 dark:shadow-slate-400/10'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50/80 to-violet-100/60 dark:from-purple-950/40 dark:to-violet-950/30',
      border: 'border-purple-200/60 dark:border-purple-800/50',
      text: 'text-purple-900 dark:text-purple-100',
      shadow: 'shadow-purple-500/10 dark:shadow-purple-400/5',
      glow: 'shadow-lg shadow-purple-500/20 dark:shadow-purple-400/10'
    },
    blue: {
      bg: 'bg-gradient-to-br from-sky-50/80 to-blue-100/60 dark:from-sky-950/40 dark:to-blue-950/30',
      border: 'border-sky-200/60 dark:border-sky-800/50',
      text: 'text-sky-900 dark:text-sky-100',
      shadow: 'shadow-sky-500/10 dark:shadow-sky-400/5',
      glow: 'shadow-lg shadow-sky-500/20 dark:shadow-sky-400/10'
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-50/80 to-green-100/60 dark:from-emerald-950/40 dark:to-green-950/30',
      border: 'border-emerald-200/60 dark:border-emerald-800/50',
      text: 'text-emerald-900 dark:text-emerald-100',
      shadow: 'shadow-emerald-500/10 dark:shadow-emerald-400/5',
      glow: 'shadow-lg shadow-emerald-500/20 dark:shadow-emerald-400/10'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50/80 to-amber-100/60 dark:from-orange-950/40 dark:to-amber-950/30',
      border: 'border-orange-200/60 dark:border-orange-800/50',
      text: 'text-orange-900 dark:text-orange-100',
      shadow: 'shadow-orange-500/10 dark:shadow-orange-400/5',
      glow: 'shadow-lg shadow-orange-500/20 dark:shadow-orange-400/10'
    },
    accent: {
      bg: 'bg-gradient-to-br from-violet-50/80 to-purple-100/60 dark:from-violet-950/40 dark:to-purple-950/30',
      border: 'border-violet-200/60 dark:border-violet-800/50',
      text: 'text-violet-900 dark:text-violet-100',
      shadow: 'shadow-violet-500/10 dark:shadow-violet-400/5',
      glow: 'shadow-lg shadow-violet-500/20 dark:shadow-violet-400/10'
    },
    destructive: {
      bg: 'bg-gradient-to-br from-red-50/80 to-rose-100/60 dark:from-red-950/40 dark:to-rose-950/30',
      border: 'border-red-200/60 dark:border-red-800/50',
      text: 'text-red-900 dark:text-red-100',
      shadow: 'shadow-red-500/10 dark:shadow-red-400/5',
      glow: 'shadow-lg shadow-red-500/20 dark:shadow-red-400/10'
    },
    muted: {
      bg: 'bg-gradient-to-br from-gray-50/80 to-slate-100/60 dark:from-gray-950/40 dark:to-slate-950/30',
      border: 'border-gray-200/60 dark:border-gray-700/50',
      text: 'text-gray-900 dark:text-gray-100',
      shadow: 'shadow-gray-500/10 dark:shadow-gray-400/5',
      glow: 'shadow-lg shadow-gray-500/20 dark:shadow-gray-400/10'
    }
  }
  return schemes[color as keyof typeof schemes] || schemes.muted
}

// Get professional icon for layer type
const getLayerIcon = (title: string, customIcon?: React.ReactNode) => {
  if (customIcon) return customIcon
  
  const titleLower = title.toLowerCase()
  if (titleLower.includes('javascript') || titleLower.includes('frontend') || titleLower.includes('ui')) {
    return <Monitor className="w-4 h-4" />
  }
  if (titleLower.includes('haskell') || titleLower.includes('monad')) {
    return <Sparkles className="w-4 h-4" />
  }
  if (titleLower.includes('prolog') || titleLower.includes('lisp') || titleLower.includes('logic')) {
    return <Brain className="w-4 h-4" />
  }
  if (titleLower.includes('python') || titleLower.includes('orchestration')) {
    return <Code className="w-4 h-4" />
  }
  if (titleLower.includes('rust') || titleLower.includes('engine')) {
    return <Zap className="w-4 h-4" />
  }
  if (titleLower.includes('c++') || titleLower.includes('hardware')) {
    return <Cog className="w-4 h-4" />
  }
  if (titleLower.includes('qpu') || titleLower.includes('quantum')) {
    return <Microscope className="w-4 h-4" />
  }
  if (titleLower.includes('database') || titleLower.includes('data')) {
    return <Database className="w-4 h-4" />
  }
  if (titleLower.includes('server') || titleLower.includes('backend')) {
    return <Server className="w-4 h-4" />
  }
  if (titleLower.includes('network') || titleLower.includes('web')) {
    return <Globe className="w-4 h-4" />
  }
  return <CircuitBoard className="w-4 h-4" />
}

// Architecture Layer Component
export function ArchitectureLayer({ title, description, components, color = 'muted', icon }: ArchitectureLayerProps) {
  const colorScheme = getColorScheme(color)
  const layerIcon = getLayerIcon(title, icon)

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer group border-2',
      colorScheme.bg,
      colorScheme.border,
      colorScheme.shadow,
      'hover:' + colorScheme.glow,
      'backdrop-blur-sm'
    )}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className={cn('flex items-center gap-3 text-base font-bold tracking-tight', colorScheme.text)}>
          <div className={cn('p-2 rounded-lg', colorScheme.bg)}>
            {layerIcon}
          </div>
          <div className="flex-1">
            <div className="font-mono text-sm uppercase tracking-wider opacity-70 mb-1">Layer</div>
            <div>{title}</div>
          </div>
        </CardTitle>
        {description && (
          <p className={cn('text-sm opacity-80 mt-2 font-medium', colorScheme.text)}>{description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0 relative z-10">
        <div className="flex flex-wrap gap-2">
          {components.map((component, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={cn(
                'text-xs font-medium px-3 py-1 transition-all duration-300 hover:scale-105',
                colorScheme.text,
                colorScheme.border,
                'bg-white/50 dark:bg-black/20 backdrop-blur-sm'
              )}
            >
              {component}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced connection arrow with animation
function ConnectionArrow({ direction = 'down', animated = true }: { direction?: 'down' | 'right'; animated?: boolean }) {
  const ArrowIcon = direction === 'down' ? ArrowDown : ArrowRight
  
  return (
    <div className="flex justify-center items-center py-2">
      <div className={cn(
        'relative p-3 rounded-full',
        'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
        'border border-blue-300/30 dark:border-blue-700/30',
        'backdrop-blur-sm shadow-lg',
        animated && 'animate-pulse'
      )}>
        <ArrowIcon className={cn(
          'w-5 h-5 text-blue-600 dark:text-blue-400',
          animated && 'transition-transform duration-300 group-hover:scale-110'
        )} />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-50" />
      </div>
    </div>
  )
}

// Architecture Stack Component
export function ArchitectureStack({ title, layers, className }: ArchitectureStackProps) {
  return (
    <Card className={cn(
      'my-8 relative overflow-hidden',
      'bg-gradient-to-br from-slate-50/50 to-gray-100/30 dark:from-slate-950/50 dark:to-gray-950/30',
      'border-2 border-slate-200/60 dark:border-slate-800/60',
      'shadow-2xl shadow-slate-500/10 dark:shadow-slate-900/20',
      'backdrop-blur-md',
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.15)_1px,transparent_0)] [background-size:20px_20px]" />
      </div>
      
      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-300/30">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider opacity-60 font-mono">Architecture</div>
              <div>{title}</div>
            </div>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-1 relative z-10">
        {layers.map((layer, index) => (
          <div key={index} className="group">
            <ArchitectureLayer {...layer} />
            {index < layers.length - 1 && <ConnectionArrow animated={true} />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Enhanced Flow Diagram Node Component
function DiagramNodeComponent({ node, className }: { node: DiagramNode; className?: string }) {
  const getNodeScheme = (type: string) => {
    switch (type) {
      case 'input':
        return getColorScheme('green')
      case 'process':
        return getColorScheme('blue')
      case 'output':
        return getColorScheme('purple')
      case 'decision':
        return getColorScheme('orange')
      case 'data':
        return getColorScheme('accent')
      case 'hardware':
        return getColorScheme('destructive')
      case 'software':
        return getColorScheme('primary')
      default:
        return getColorScheme('muted')
    }
  }

  const getNodeIcon = (type: string, customIcon?: React.ReactNode) => {
    if (customIcon) return customIcon
    
    switch (type) {
      case 'input': return <ArrowRight className="w-5 h-5" />
      case 'process': return <Cpu className="w-5 h-5" />
      case 'output': return <Activity className="w-5 h-5" />
      case 'decision': return <GitBranch className="w-5 h-5" />
      case 'data': return <Database className="w-5 h-5" />
      case 'hardware': return <CircuitBoard className="w-5 h-5" />
      case 'software': return <Code className="w-5 h-5" />
      default: return <Brain className="w-5 h-5" />
    }
  }

  const scheme = getNodeScheme(node.type || 'default')
  const nodeIcon = getNodeIcon(node.type || 'default', node.icon)

  return (
    <Card className={cn(
      'relative overflow-hidden p-6 text-center transition-all duration-500 hover:scale-105 cursor-pointer group border-2 min-w-[200px]',
      scheme.bg,
      scheme.border,
      scheme.shadow,
      'hover:' + scheme.glow,
      'backdrop-blur-sm',
      className
    )}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className={cn('p-3 rounded-xl', scheme.bg, 'ring-2 ring-white/20')}>
          {nodeIcon}
        </div>
        <div>
          <div className={cn('text-lg font-bold tracking-tight', scheme.text)}>{node.label}</div>
          {node.description && (
            <div className={cn('text-sm opacity-80 mt-1', scheme.text)}>{node.description}</div>
          )}
        </div>
      </div>
    </Card>
  )
}

// Flow Diagram Component
export function FlowDiagram({ title, nodes, direction = 'vertical', className }: FlowDiagramProps) {
  const isVertical = direction === 'vertical'

  return (
    <Card className={cn(
      'my-8 relative overflow-hidden',
      'bg-gradient-to-br from-slate-50/50 to-gray-100/30 dark:from-slate-950/50 dark:to-gray-950/30',
      'border-2 border-slate-200/60 dark:border-slate-800/60',
      'shadow-2xl shadow-slate-500/10 dark:shadow-slate-900/20',
      'backdrop-blur-md',
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.15)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>
      
      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-300/30">
              <GitBranch className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider opacity-60 font-mono">Flow</div>
              <div>{title}</div>
            </div>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="relative z-10">
        <div className={cn(
          'flex gap-8 items-center',
          isVertical ? 'flex-col' : 'flex-row flex-wrap justify-center'
        )}>
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center gap-6">
              <DiagramNodeComponent node={node} />
              {index < nodes.length - 1 && (
                <ConnectionArrow direction={isVertical ? 'down' : 'right'} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Quantum Process Diagram (specialized for quantum consciousness content)
interface QuantumProcessProps {
  title?: string
  states: { label: string; description?: string; probability?: number }[]
  collapseEvent: string
  className?: string
}

export function QuantumProcessDiagram({ title, states, collapseEvent, className }: QuantumProcessProps) {
  return (
    <Card className={cn(
      'my-8 relative overflow-hidden',
      'bg-gradient-to-br from-purple-50/50 to-blue-50/30 dark:from-purple-950/30 dark:to-blue-950/20',
      'border-2 border-purple-200/60 dark:border-purple-800/60',
      'shadow-2xl shadow-purple-500/10 dark:shadow-purple-900/20',
      'backdrop-blur-md',
      className
    )}>
      {/* Quantum background effect */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.4)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.4)_0%,transparent_50%)]" />
      </div>
      
      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-purple-900 dark:text-purple-100">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-300/30">
              <CloudLightning className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider opacity-60 font-mono">Quantum Process</div>
              <div>{title}</div>
            </div>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-8 relative z-10">
        {/* Superposition States */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Superposition States
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {states.map((state, index) => (
              <Card key={index} className={cn(
                'p-4 relative overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105',
                'bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/20 dark:to-purple-900/20',
                'border-2 border-blue-200/50 dark:border-blue-800/50',
                'shadow-lg shadow-blue-500/10 dark:shadow-blue-900/20',
                'hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-900/40',
                'backdrop-blur-sm'
              )}>
                {/* Probability indicator */}
                {state.probability && (
                  <div className="absolute top-2 right-2">
                    <Badge className={cn(
                      'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0',
                      'shadow-lg shadow-purple-500/20'
                    )}>
                      {Math.round(state.probability * 100)}%
                    </Badge>
                  </div>
                )}
                
                {/* Quantum glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="text-base font-bold text-blue-900 dark:text-blue-100 mb-2">{state.label}</div>
                  {state.description && (
                    <div className="text-sm text-blue-700 dark:text-blue-300 opacity-80">{state.description}</div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Collapse Animation */}
        <div className="flex justify-center py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <ArrowUpDown className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-purple-500/20 animate-ping" />
            </div>
            <Badge className={cn(
              'bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 to-pink-700 text-white border-0 px-4 py-2',
              'shadow-lg shadow-purple-500/30 dark:shadow-purple-900/30',
              'animate-pulse font-bold tracking-wider'
            )}>
              QUANTUM COLLAPSE
            </Badge>
          </div>
        </div>

        {/* Collapse Result */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Conscious Experience
          </h4>
          <Card className={cn(
            'p-6 relative overflow-hidden',
            'bg-gradient-to-br from-purple-100/60 to-pink-100/60 dark:from-purple-900/40 dark:to-pink-900/40',
            'border-2 border-purple-300/60 dark:border-purple-700/60',
            'shadow-xl shadow-purple-500/20 dark:shadow-purple-900/30',
            'backdrop-blur-sm'
          )}>
            {/* Success glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
            
            <div className="relative z-10 text-center">
              <div className="text-lg font-bold text-purple-900 dark:text-purple-100 tracking-tight">
                {collapseEvent}
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

// System Flow (for complex multi-step processes)
interface SystemFlowProps {
  title?: string
  steps: Array<{
    title: string
    description: string
    components: string[]
    color?: string
  }>
  className?: string
}

export function SystemFlowDiagram({ title, steps, className }: SystemFlowProps) {
  return (
    <Card className={cn(
      'my-8 relative overflow-hidden',
      'bg-gradient-to-br from-slate-50/50 to-gray-100/30 dark:from-slate-950/50 dark:to-gray-950/30',
      'border-2 border-slate-200/60 dark:border-slate-800/60',
      'shadow-2xl shadow-slate-500/10 dark:shadow-slate-900/20',
      'backdrop-blur-md',
      className
    )}>
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(59,130,246,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      
      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-300/30">
              <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider opacity-60 font-mono">System Flow</div>
              <div>{title}</div>
            </div>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-8 relative z-10">
        {steps.map((step, index) => (
          <div key={index} className="group">
            <div className="flex items-start gap-6">
              {/* Step number with glow */}
              <div className="relative flex-shrink-0">
                <div className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold text-white',
                  'bg-gradient-to-br from-blue-500 to-indigo-600',
                  'shadow-lg shadow-blue-500/30',
                  'border-2 border-blue-300/30',
                  'transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/40'
                )}>
                  {index + 1}
                </div>
                <div className="absolute inset-0 w-12 h-12 rounded-xl bg-blue-500/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Step content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Components */}
                <div className="flex flex-wrap gap-2">
                  {step.components.map((component, componentIndex) => (
                    <Badge 
                      key={componentIndex} 
                      variant="secondary" 
                      className={cn(
                        'text-xs font-medium px-3 py-1',
                        'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 to-indigo-950',
                        'border border-blue-200/50 dark:border-blue-800/50',
                        'text-blue-700 dark:text-blue-300',
                        'hover:scale-105 transition-transform duration-200 cursor-pointer',
                        'shadow-sm hover:shadow-md'
                      )}
                    >
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div className="ml-6 mt-4 mb-4">
                <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 opacity-50" />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 