import groq from 'groq';

import {MODULE_ACCORDION} from './modules/accordion';
import {MODULE_CALLOUT} from './modules/callout';
import {MODULE_CALL_TO_ACTION} from './modules/callToAction';
import {MODULE_COLLECTION} from './modules/collection';
import {MODULE_IMAGE} from './modules/image';
import {MODULE_INSTAGRAM} from './modules/instagram';
import {MODULE_PRODUCT} from './modules/product';

export const MODULES = groq`
  _key,
  _type,
  (_type == "module.accordion" || _type == "accordion") => {
    ${MODULE_ACCORDION}
  },
  (_type == "module.callout" || _type == "callout") => {
    ${MODULE_CALLOUT}
  },
  (_type == 'module.callToAction' || _type == 'callToAction') => {
    ${MODULE_CALL_TO_ACTION}
  },
  (_type == "module.collection" || _type == "collection") => {
    ${MODULE_COLLECTION}
  },
  (_type == "module.images" || _type == "images" || _type == "module.image" || _type == "image") => {
    ${MODULE_IMAGE}
  },
  (_type == "module.instagram" || _type == "instagram") => {
    ${MODULE_INSTAGRAM}
  },
  (_type == "module.products" || _type == "module.product" || _type == "products" || _type == "product") => {
    ${MODULE_PRODUCT}
  }
`;