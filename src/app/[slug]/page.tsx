import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { Layout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const components = {
  code({ className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <SyntaxHighlighter
        language={match[1]}
        style={dracula}
        PreTag="div"
        customStyle={{
          borderRadius: '0.75rem',
          fontSize: '0.9rem',
          lineHeight: '1.5',
        }}
        showLineNumbers={false}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Monadics`,
    description: post.excerpt || `An article by ${post.author}`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `An article by ${post.author}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-sans text-primary">
            {post.title.toUpperCase()}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="font-bold text-lg">{post.author.toUpperCase()}</span>
              <span className="text-xl">•</span>
              <time dateTime={post.date} className="font-bold text-lg">{formatDate(post.date)}</time>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="hover:bg-primary/10 font-bold">
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="mb-8" />
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>
      </article>
    </Layout>
  )
} 