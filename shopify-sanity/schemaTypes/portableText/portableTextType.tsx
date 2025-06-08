import {defineArrayMember, defineField} from 'sanity'

export const portableTextType = defineField({
  name: 'portableText',
  type: 'array',
  of: [
    defineArrayMember({
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
        annotations: [
          {
            name: 'linkProduct',
            type: 'linkProduct',
          },
          {
            name: 'linkEmail',
            type: 'linkEmail',
          },
          {
            name: 'linkInternal',
            type: 'linkInternal',
          },
          {
            name: 'linkExternal',
            type: 'linkExternal',
          },
        ],
      },
      type: 'block',
    }),
    defineArrayMember({ type: 'module.accordion' }),
    defineArrayMember({ type: 'module.callout' }),
    defineArrayMember({ type: 'module.grid' }),
    defineArrayMember({ type: 'module.images' }),
    defineArrayMember({ type: 'imageWithProductHotspots', title: 'Image with Hotspots' }),
    defineArrayMember({ type: 'module.instagram' }),
    defineArrayMember({ type: 'module.products' }),
  ],
})
