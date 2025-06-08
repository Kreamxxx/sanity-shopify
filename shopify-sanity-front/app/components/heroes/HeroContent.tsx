import SanityImage from '~/components/media/SanityImage';
import ProductHotspot from '~/components/product/Hotspot';
import type {SanityImageWithProductHotspots} from '~/lib/sanity';
import {useRootLoaderData} from '~/root';

type Props = {
  content: SanityImageWithProductHotspots;
  asBackground?: boolean; // option pour afficher en fond
};

export default function ImageWithProductHotspots({content, asBackground = false}: Props) {
  const {sanityDataset, sanityProjectID} = useRootLoaderData();

  return (
    <div className={asBackground ? 'relative w-full h-[400px] md:h-[600px]' : 'relative w-full'}>
      <SanityImage
        alt={content?.image?.altText}
        crop={content?.image?.crop}
        dataset={sanityDataset}
        hotspot={content?.image?.hotspot}
        layout={asBackground ? 'fill' : 'responsive'}
        objectFit="cover"
        projectId={sanityProjectID}
        sizes="100vw"
        src={content?.image?.asset?._ref || content?.image?.asset?._id}
        className={asBackground ? 'absolute inset-0 -z-10' : ''}
      />

      {content.productHotspots?.map((hotspot) => {
        if (!hotspot?.product?.gid) {
          return null;
        }

        return (
          <ProductHotspot
            key={hotspot._key}
            productGid={hotspot.product.gid}
            variantGid={hotspot.product.variantGid}
            x={hotspot.x}
            y={hotspot.y}
          />
        );
      })}
    </div>
  );
}