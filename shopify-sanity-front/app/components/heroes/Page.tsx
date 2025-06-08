import clsx from 'clsx';

import HeroContent from '~/components/heroes/HeroContent';
import type {SanityHeroPage} from '~/lib/sanity';
import {useColorTheme} from '~/lib/theme';
import {useRootLoaderData} from '~/root';
import { urlFor } from '~/lib/sanity/image';

export type Props = {
  fallbackTitle: string;
  hero?: SanityHeroPage;
};

export default function Page({fallbackTitle, hero}: Props) {
  const colorTheme = useColorTheme();
  const {sanityDataset, sanityProjectID} = useRootLoaderData();

  let backgroundImageUrl;
  const firstBlock = Array.isArray(hero?.content) ? hero.content[0] : hero?.content;

  if (firstBlock?._type === 'imageWithProductHotspots' && firstBlock.image?.asset?._ref) {
    backgroundImageUrl = urlFor(firstBlock.image.asset)
      .projectId(sanityProjectID)
      .dataset(sanityDataset)
      .width(2000)
      .url();
  }

 return (
  <div
    className={clsx(
      'relative flex flex-col items-center rounded-b-xl px-4 pb-4 pt-24',
      'md:px-8 md:pb-8 md:pt-34',
    )}
    style={{background: colorTheme?.background || 'white'}}
  >
    {/* Suppression de l'image de fond */}

    <div className="relative z-10 w-full max-w-[60rem] text-center">
      {hero?.title ? (
        <h1
          className={clsx(
            'mb-7 whitespace-pre-line text-2xl md:text-2xl',
          )}
          style={{color: colorTheme?.text || 'black'}}
        >
          {hero.title}
        </h1>
      ) : (
        <h1
          className={clsx(
            'mb-7 whitespace-pre-line text-3xl md:text-5xl',
          )}
        >
          {fallbackTitle}
        </h1>
      )}
    </div>

  

    {/* Hero content */}
    {Array.isArray(hero?.content) && hero.content.length > 0 ? (
      <div
        className={clsx(
          'relative z-10 mt-6 w-full space-y-8',
          'md:mt-12',
        )}
      >
        {hero.content.map((block) => (
          <HeroContent key={block._key} content={block} />
        ))}
      </div>
    ) : hero?.content ? (
      <div
        className={clsx(
          'relative z-10 mt-6 w-full',
          'md:mt-12',
        )}
      >
        <HeroContent content={hero.content} />
      </div>
    ) : null}
  </div>
);
}