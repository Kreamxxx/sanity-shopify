import {defineType, defineField} from 'sanity'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton CTA',
      type: 'linkInternal',
    }),
  ],
})