'use client'

import { MDXProvider } from '@mdx-js/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ReactNode, HTMLAttributes } from 'react'

interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string
  children?: ReactNode
}

const Code = ({ className, children }: CodeProps) => {
  const language = className?.replace('language-', '') || 'text'
  
  return (
    <SyntaxHighlighter
      language={language}
      style={dracula}
      customStyle={{
        borderRadius: '0.75rem',
        fontSize: '0.9rem',
        lineHeight: '1.5',
      }}
      showLineNumbers={false}
    >
      {String(children || '').replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

const components = {
  code: Code,
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