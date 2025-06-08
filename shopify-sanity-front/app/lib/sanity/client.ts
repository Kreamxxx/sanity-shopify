import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'y2oirob5',   // ton projectId Sanity
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-06-07',
});