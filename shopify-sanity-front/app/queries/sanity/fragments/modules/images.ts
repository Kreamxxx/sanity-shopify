import groq from 'groq';

import {MODULE_IMAGE} from './image';

export const MODULE_IMAGES = groq`
  "fullWidth": select(
    count(imageFeatures) > 1 => true,
    fullWidth,
  ),
  layout,
  imageFeatures[] {
    _key,
    ${MODULE_IMAGE}
  }
`;
