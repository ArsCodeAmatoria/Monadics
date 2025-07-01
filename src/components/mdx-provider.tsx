'use client'

import { MDXProvider } from '@mdx-js/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ReactNode, HTMLAttributes } from 'react'

interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string
  children?: ReactNode
}

const Code = ({ className, children, ...props }: CodeProps) => {
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
  h1: (props: any) => <h1 className="text-3xl font-semibold mb-6 text-primary font-sans" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-4 mt-8 text-primary font-sans" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mb-3 mt-6 font-sans" {...props} />,
  p: (props: any) => <p className="text-base leading-relaxed mb-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props} />
  ),
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-base leading-relaxed" {...props} />,
}

interface CustomMDXProviderProps {
  children: ReactNode
}

export function CustomMDXProvider({ children }: CustomMDXProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>
} 