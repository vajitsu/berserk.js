import './code.css'
import styles from './docs.module.css'

import matter from 'gray-matter'
import { markdownToHtml } from '../../../lib/markdown'

async function getDocument(name: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/vercel/next.js/canary/docs/${name}.md`
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.text()
}

export default async function Page({ params }) {
  const { slug } = params
  const markdown = await getDocument(slug)
  const { content, data: frontmatter } = matter(markdown)
  const html = await markdownToHtml(content)

  return (
    <div className={styles.jsx}>
      <div className={styles.page_content}>
        <div className={styles.docs}>
          <div
            className={styles['docs-contents']}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      </div>
    </div>
  )
}
