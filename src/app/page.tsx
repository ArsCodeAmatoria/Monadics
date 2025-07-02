import { Layout } from '@/components/layout'
import { HomePage } from '@/components/home-page'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { WebsiteSchema } from '@/components/website-schema'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation. Where minds meet mathematics at the intersection of reality and code.',
  keywords: [
    'quantum consciousness blog',
    'mathematical computation',
    'monadic programming', 
    'theoretical physics',
    'consciousness studies',
    'haskell programming',
    'bayesian inference',
    'quantum computing research',
    'computational philosophy',
    'artificial intelligence theory'
  ],
  openGraph: {
    title: 'Monadics - Quantum Consciousness & Mathematical Computation',
    description: 'Explore the intersection of minds and mathematics through theoretical quantum consciousness, mathematical formalisms, and monadic computation.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Monadics - Quantum Consciousness & Mathematical Computation',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monadics - Quantum Consciousness & Mathematical Computation',
    description: 'Explore the intersection of minds and mathematics through theoretical quantum consciousness, mathematical formalisms, and monadic computation.',
    images: ['/og-image.png'],
  },
}

export default function Home() {
  const allPosts = getAllPosts()
  const allTags = getAllTags()

  return (
    <Layout>
      <WebsiteSchema />
      <HomePage posts={allPosts} tags={allTags} />
    </Layout>
  )
}
