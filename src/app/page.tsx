import { Layout } from '@/components/layout'
import { HomePage } from '@/components/home-page'
import { getAllPosts, getAllTags } from '@/lib/blog'

export default function Home() {
  const allPosts = getAllPosts()
  const allTags = getAllTags()

  return (
    <Layout>
      <HomePage posts={allPosts} tags={allTags} />
    </Layout>
  )
}
