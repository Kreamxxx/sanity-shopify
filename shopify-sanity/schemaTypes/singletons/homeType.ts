import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'
import { GROUPS } from '../../constants'

const TITLE = 'Home'

export const homeType = defineField({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'hero',
      type: 'hero',
      group: 'editorial',
    }),
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        defineArrayMember({ type: 'module.accordion' }),
        defineArrayMember({ type: 'module.callout' }),
        defineArrayMember({ type: 'module.grid' }),
        defineArrayMember({ type: 'module.images' }),
        defineArrayMember({ type: 'imageWithProductHotspots', title: 'Image with Hotspots' }),
        defineArrayMember({ type: 'module.instagram' }),
        defineArrayMember({ type: 'module.products' }),
      ],
      group: 'editorial',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        media: HomeIcon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
