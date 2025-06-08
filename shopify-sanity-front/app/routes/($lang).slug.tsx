import {useLoaderData} from '@remix-run/react';
import {defer, json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {notFound} from '~/lib/utils';

// Ce composant permet de construire dynamiquement les blocs
import {PageBuilder} from '~/components/cms/PageBuilder';
import {PAGE_QUERY_BY_SLUG} from '~/queries/sanity/page';
import type {SanityPage} from '~/types/sanity';

export async function loader({params, context}: LoaderFunctionArgs) {
  const {slug} = params;

  const pageSlug = Array.isArray(slug) ? slug.join('/') : slug;

  const page = await context.sanity.query<SanityPage | null>({
    query: PAGE_QUERY_BY_SLUG,
    params: {slug: pageSlug},
  });

  if (!page) {
    return notFound();
  }

  return defer({page});
}

export default function DynamicPage() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <div className="page-container">
      <h1>{page.title}</h1>
      <PageBuilder blocks={page.content} />
    </div>
  );
}
