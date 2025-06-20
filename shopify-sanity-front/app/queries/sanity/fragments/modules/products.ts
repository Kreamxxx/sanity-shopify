import groq from 'groq';

import {MODULE_PRODUCT} from './product';

export const MODULE_PRODUCTS = groq`
  layout,
  products[] {
    _key,
    _type,
    ${MODULE_PRODUCT}
  }
`;
