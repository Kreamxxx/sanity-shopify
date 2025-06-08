import {Await, useLoaderData} from '@remix-run/react';
import type {SeoHandleFunction} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import {Suspense} from 'react';
import invariant from 'tiny-invariant';

import PageHero from '~/components/heroes/Page';
import PortableText from '~/components/portableText/PortableText';
import {PageBuilder} from '~/components/cms/PageBuilder';
import type {SanityPage} from '~/lib/sanity';
import {ColorTheme} from '~/lib/theme';
import {fetchGids, notFound, validateLocale} from '~/lib/utils';
import { PAGE_QUERY_BY_SLUG } from '~/queries/sanity/page';

const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
  title: data?.page?.seo?.title,
  description: data?.page?.seo?.description,
  media: data?.page?.seo?.image,
});

export const handle = {
  seo,
};

export async function loader({params, context}: LoaderFunctionArgs) {
  validateLocale({context, params});

  const {handle} = params;
  invariant(handle, 'Missing page handle');

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const page = await context.sanity.query<SanityPage>({
    query: PAGE_QUERY_BY_SLUG,
    params: {
      slug: handle,
    },
    cache,
  });

  if (!page) {
    throw notFound();
  }

  // Résoudre les références Storefront API (si nécessaire)
  const gids = fetchGids({page, context});

  return defer({page, gids});
}

export default function Page() {
  const {page: pageData, gids} = useLoaderData<typeof loader>();

  // Forcer le typage car defer modifie les types
  const page = pageData as SanityPage;

  return (
    <ColorTheme value={page.colorTheme}>
      <Suspense>
        <Await resolve={gids}>
          {/* Page hero */}
          <PageHero fallbackTitle={page.title} hero={page.hero} />

          {/* Body en PortableText */}
          {page.body && (
            <PortableText
              blocks={page.body}
              centered
              className={clsx('mx-auto max-w-[660px] px-4 pb-24 pt-8', 'md:px-8')}
            />
          )}

          {/* Contenu dynamique - PageBuilder */}
          {page.content && (
            <div className="mx-auto">
              <PageBuilder blocks={page.content} />
            </div>
          )}
        </Await>
      </Suspense>
    </ColorTheme>
  );
}