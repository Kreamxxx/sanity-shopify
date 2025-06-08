import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const alternateCard = defineType({
  name: 'alternateCard',
  title: 'Alternate Card',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule
    }),
    defineField({
        name: 'backgroundMode',
        title: 'Mode de fond',
        type: 'string',
        options: {
            list: [
                {title: 'Light', value: 'light'},
                {title: 'Dark', value: 'dark'},
            ],
            layout: 'radio',
        },
        initialValue: 'light',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Position de l’image',
      type: 'string',
      options: {
        list: [
          {title: 'left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texte du bouton',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Lien du bouton',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Alternate Card',
        media,
      }
    },
  },
})