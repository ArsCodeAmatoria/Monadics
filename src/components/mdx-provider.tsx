'use client'

import { MDXProvider } from '@mdx-js/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ReactNode, HTMLAttributes } from 'react'
import { InsightQuote } from './insight-quote'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string
  children?: ReactNode
}

const Code = ({ className, children }: CodeProps) => {
  const language = className?.replace('language-', '') || 'text'
  
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-2">
        <Badge variant="secondary" className="text-xs uppercase font-mono bg-muted text-muted-foreground">
          {language}
        </Badge>
      </div>
      
      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={language}
          style={dracula}
          PreTag="div"
          customStyle={{
            borderRadius: '0',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            margin: '0',
            border: 'none'
          }}
          showLineNumbers={false}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

// Card wrapper for content sections
const ContentCard = ({ children, title }: { children: ReactNode; title?: string }) => {
  if (title) {
    return (
      <Card className="my-6 bg-muted/20 border-muted">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="my-6 bg-muted/20 border-muted">
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  )
}

const components = {
  code: Code,
  InsightQuote,
  ContentCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-semibold mb-6 text-primary font-sans" {...props} />,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-semibold mb-4 mt-8 text-primary font-sans" {...props} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold mb-3 mt-6 font-sans" {...props} />,
  p: (props: HTMLAttributes<HTMLParagraphElement>) => <p className="text-base leading-relaxed mb-4" {...props} />,
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: HTMLAttributes<HTMLLIElement>) => <li className="text-base leading-relaxed" {...props} />,
}

interface CustomMDXProviderProps {
  children: ReactNode
}

export function CustomMDXProvider({ children }: CustomMDXProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>
} 