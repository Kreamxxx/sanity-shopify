// --- page query GROQ (~/queries/sanity/page.ts) ---

import groq from 'groq';

export const PAGE = `
  _id,
  _type,
  title,
  slug,
  colorTheme,
  showHero,
  hero {
    _type,
    title,
    description,
    showHero,
    content[] {
      _key,
      _type,

      // Exemple bloc image avec hotspots
      _type == "imageWithProductHotspots" => {
        _type,
        _key,
        showHotspots,
        image {
          altText,
          crop,
          hotspot,
          asset {
            _ref,
            metadata {
              lqip,
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          }
        },
        link[] {
          _key,
          _type,
          _type == "linkInternal" => {
            _type,
            title,
            reference->{
              _type,
              slug {
                current
              }
            }
          },
          _type == "linkExternal" => {
            _type,
            title,
            url,
            newWindow
          }
        }
      },

      // Exemple bloc produit
      _type == "productWithVariant" => {
        _type,
        _key,
        gid,
        variantGid
      }
    }
  },

  body[] {
    ...,
    markDefs[] {
      ...,
      _type == "linkInternal" => {
        _type,
        reference->{
          _type,
          slug
        }
      }
    }
  },

  content[] {
    _key,
    _type,

    _type == "textBlock" => {
      _key,
      _type,
      title,
      body
    },

    _type == "image" => {
      _key,
      _type,
      asset {
        _ref
      },
      altText
    },

    _type == "alternateCard" => {
      _key,
      _type,
      title,
      text,
      image {
        asset {
          _ref
        },
        altText
      },
      imagePosition,
      backgroundMode,
      buttonLabel,
      buttonLink
    }
  },

  seo {
    title,
    description,
    image {
      asset {
        _ref
      }
    }
  }
`;

export const PAGE_QUERY_BY_SLUG = groq`
  *[
    _type == "page" &&
    slug.current == $slug
  ][0]{
    ${PAGE}
  }
`;