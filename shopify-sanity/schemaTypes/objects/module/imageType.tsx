import {ImageIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {imageFeatureType} from './imageFeatureType'

// Legacy single image module kept for backwards compatibility
export const imageType = defineField({
  ...imageFeatureType,
  name: 'module.image',
  title: 'Image',
  icon: ImageIcon,
})
