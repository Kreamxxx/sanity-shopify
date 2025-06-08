import type {PortableTextBlock} from '@portabletext/types';

export type SanitySlug = {
  _type: 'slug';
  current: string;
};

export type SanityBlock = {
  _key: string;
  _type: string;
  [key: string]: any;
};

export type SanityHeroPage = {
  title?: string;
  description?: string;
  content?: (SanityImageWithProductHotspots | SanityProductWithVariant)[];
};

export type SanityPage = {
  _id: string;
  _type: 'page';
  title: string;
  slug: SanitySlug;
  hero?: SanityHeroPage;
  content?: SanityBlock[];
  body?: PortableTextBlock[];
};