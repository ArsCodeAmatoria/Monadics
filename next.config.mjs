import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})

export default withMDX(nextConfig)
