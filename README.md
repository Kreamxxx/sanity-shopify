#README - Shopify Environments for Hydrogen + Sanity

##1. Overview

This project uses Shopify Hydrogen (React/Remix frontend) connected to Sanity.io for dynamic management of pages, modules, and products.
Shopify product data is synced into Sanity via dedicated documents (productVariant).

##2. Shopify Environment Configuration

###2.1 Environment Variables (.env)

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SANITY_PROJECT_ID=your-sanity-project-id
SANITY_DATASET=production
```

###2.2 Shopify API Access

- Create a private or custom app in Shopify Admin > Apps > Develop apps
- Grant necessary product read permissions (read products, variants, etc.)
- Retrieve the token and add it to your .env file

##3. Sanity Synchronization

- Sanity contains productVariant documents synced from Shopify
- These documents store Shopify info under the 'store' field (gid, slug, status...)
- Sanity product modules reference these variants

##4. Important GROQ Queries

Product with variant:
```bash
export const PRODUCT_WITH_VARIANT = groq\`
  productVariant->{
    _id,
    _type,
    "available": !store.isDeleted && store.status == 'active',
    "gid": store.gid,
    "slug": store.slug.current,
    "variantGid": store.gid
  }
\`;
```

Product module:
```bash
export const MODULE_PRODUCT = groq\`
  productWithVariant {
    \${PRODUCT_WITH_VARIANT}
  }
\`;
```

##5. Hydrogen Loading & Rendering

- Loader fetches Sanity page via GROQ
- Uses fetchGids to retrieve product GIDs
- ModuleGrid and ProductCard components render products according to variants

##6. Best Practices

- Ensure variants are properly synced and active (store.status == 'active')
- Test GROQ queries in Sanity Studio (Vision plugin)
- Use Sanity Preview to test content before publishing
- Verify correct API permissions in Shopify

##7. Useful Resources

- https://shopify.dev/custom-storefronts/hydrogen
- https://www.sanity.io/docs
- https://www.sanity.io/docs/groq

##8. Contact

For questions: Luca Di Fazio - Lead Tech Ecommerce @ Velvet
Email: ldifazio@velvetconsulting.com
