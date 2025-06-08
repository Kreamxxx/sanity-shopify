import imageUrlBuilder from '@sanity/image-url';
import {client} from './client'; // adapte le chemin selon ton projet

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}