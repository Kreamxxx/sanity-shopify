import {usePreviewContext} from 'hydrogen-sanity';
import type {SanityLayout} from '~/lib/sanity';

import Footer from '~/components/global/Footer';
import Header from '~/components/global/Header';
import {PreviewBanner} from '~/components/preview/PreviewBanner';

type LayoutProps = {
  layout: SanityLayout;
  backgroundColor?: string;
  children: React.ReactNode;
};

export function Layout({layout, backgroundColor, children}: LayoutProps) {
  const isPreview = Boolean(usePreviewContext());

  return (
    <>
      <div className="absolute left-0 top-0">
        <a
          href="#mainContent"
          className="sr-only p-4 focus:not-sr-only focus:block"
        >
          Skip to content
        </a>
      </div>

      <div
        className="max-w-screen flex min-h-screen flex-col"
        style={{background: backgroundColor}}
      >
        <Header layout={layout} />

        <main className="relative grow" id="mainContent" role="main">
          <div className="mx-auto pb-overlap">{children}</div>
        </main>
      </div>

      <Footer layout={layout} />

      {isPreview ? <PreviewBanner /> : null}
    </>
  );
}