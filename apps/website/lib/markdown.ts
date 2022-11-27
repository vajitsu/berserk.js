import { unified } from 'unified'

import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'

import rehypeStringify from 'rehype-stringify'
import rehypePrism from '@mapbox/rehype-prism'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeRewrite from 'rehype-rewrite'

import doc_styles from '../app/docs/[slug]/docs.module.css'

import _ from 'lodash'

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeCodeTitles)
    .use(rehypeRewrite, {
      rewrite: (node, index, parent) => {
        if (
          node.type === 'element' &&
          /^(?:h2|h3|h4|h5|h6)/.test(node.tagName)
        ) {
          const text =
            node.children[0].type === 'text'
              ? node.children[0].value
              : undefined
          if (!text) return

          node.properties.className = doc_styles['heading']
          node.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: {
                id: _.kebabCase(text),
              },
              children: [],
            },
            {
              type: 'element',
              tagName: 'a',
              properties: {
                href: `#${node.properties.id}`,
              },
              children: [{ type: 'text', value: text }],
            },
            {
              type: 'element',
              tagName: 'span',
              properties: {
                class: doc_styles['permalink'],
              },
              children: [
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    viewBox: '0 0 16 16',
                    width: '16',
                    height: '16',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'g',
                      properties: {
                        'stroke-width': '1',
                        fill: '#000000',
                        stroke: '#000000',
                      },
                      children: [
                        {
                          type: 'element',
                          tagName: 'path',
                          properties: {
                            fill: 'none',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-miterlimit': '10',
                            d: 'M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698',
                          },
                          children: [],
                        },
                        {
                          type: 'element',
                          tagName: 'path',
                          properties: {
                            fill: 'none',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-miterlimit': '10',
                            d: 'M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698',
                          },
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ]
          // a.href = `#${node.properties.id}`
        }
      },
    })
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}
