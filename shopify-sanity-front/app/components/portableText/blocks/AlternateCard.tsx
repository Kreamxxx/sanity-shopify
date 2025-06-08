import clsx from 'clsx';
import {PortableTextBlock} from '@portabletext/types';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import {urlFor} from '~/lib/sanity/image';
import type {SanityAlternateCard} from '~/lib/sanity';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  value: PortableTextBlock & SanityAlternateCard;
};

export default function AlternateCardBlock({value}: Props) {
  const {
    image,
    imagePosition = 'left',
    backgroundMode = 'light',
    title,
    text,
    buttonLabel,
    buttonLink,
  } = value;

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const imageUrl = image?.asset ? urlFor(image.asset).width(1000).url() : null;

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) {
      console.warn('Refs non définis, animation GSAP ignorée');
      return;
    }

    const directionImage = imagePosition === 'right' ? 200 : -200;
    const directionText = imagePosition === 'right' ? -200 : 200;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: true,
      },
    });

    tl.fromTo(
      imageRef.current,
      {autoAlpha: 0, x: directionImage},
      {autoAlpha: 1, x: 0, duration: 0.8, ease: 'power4.out'}
    ).fromTo(
      textRef.current,
      {autoAlpha: 0, x: directionText},
      {autoAlpha: 1, x: 0, duration: 0.8, ease: 'power4.out'},
      '-=0.7'
    );

    return () => {
      if (tl) tl.kill();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [imagePosition]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        backgroundMode === 'dark' ? 'bg-black text-white' : 'bg-white text-black',
        'w-full py-16'
      )}
    >
      <div
        className={clsx(
          'flex flex-col items-center gap-6 md:flex-row max-w-[1440px] mx-auto px-4 md:px-8',
          imagePosition === 'right' && 'md:flex-row-reverse'
        )}
      >
        {imageUrl && (
          <div ref={imageRef} className="w-full md:w-1/2 opacity-0">
            <img
              src={imageUrl}
              alt={title || ''}
              className="w-full object-cover"
            />
          </div>
        )}

        <div ref={textRef} className="w-full md:w-1/2 text-center md:text-left opacity-0">
          {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
          {text && <p className="mb-6 text-lg">{text}</p>}
          {buttonLabel && buttonLink && (
            <a
              href={buttonLink}
              className={clsx(
                'inline-block rounded px-6 py-3 transition-all duration-300',
                backgroundMode === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 shadow-md'
                  : 'bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-md'
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}