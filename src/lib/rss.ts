import { getAllPosts } from './blog'

export function generateRssFeed() {
  const posts = getAllPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.dev'

  const rssItems = posts
    .map((post) => {
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.excerpt || ''}]]></description>
        <link>${siteUrl}/${post.slug}</link>
        <guid>${siteUrl}/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <author>contact@monadics.dev (${post.author})</author>
        ${post.tags?.map(tag => `<category>${tag}</category>`).join('\n        ') || ''}
      </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Monadics</title>
    <description>A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <managingEditor>contact@monadics.dev (LUCI)</managingEditor>
    <webMaster>contact@monadics.dev (LUCI)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`
} 