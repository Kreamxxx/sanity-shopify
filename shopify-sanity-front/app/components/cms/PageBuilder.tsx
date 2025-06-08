import type {SanityPage} from '~/types/sanity';
import AlternateCard from '~/components/portableText/blocks/AlternateCard';

export function PageBuilder({blocks}: {blocks?: SanityPage['content']}) {

  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="page-blocks">
      {blocks.map((block, i) => {
        switch (block._type) {
          case 'hero':
            return <div key={i} className="hero-block">{block.title}</div>; // à remplacer par un vrai composant

          case 'textBlock':
            return <p key={i}>{block.text}</p>;

          case 'alternateCard':
            return <AlternateCard key={block._key || i} value={block} />;

          default:
            return <div key={i}>Unknown block: {block._type}</div>;
        }
      })}
    </div>
  );
}