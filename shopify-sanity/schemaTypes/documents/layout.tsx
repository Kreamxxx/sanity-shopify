import {defineField, defineType} from 'sanity'

export const layoutType = defineType({
  name: 'layout',
  title: 'Layout',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'reference',
      to: [{type: 'header'}],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footerSettings', // ✅ on remplace la référence par un objet inline
    }),
  ],
  preview: {
    select: {
      header: 'header._ref',
    },
    prepare({header}) {
      return {
        title: `Layout – Header: ${header ?? 'null'}`,
      }
    },
  },
})