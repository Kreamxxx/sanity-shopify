import clsx from 'clsx';

import ProductModule from '~/components/modules/Product';
import type {SanityModuleProducts} from '~/lib/sanity';

type Props = {
  module: SanityModuleProducts;
};

export default function ProductsModule({module}: Props) {
  if (!Array.isArray(module.modules)) {
    return null;
  }

  const multipleProducts = module.modules.length > 1;

  return (
    <div
      className={clsx(
        'my-8 grid grid-cols-1 gap-3',
        multipleProducts ? 'md:grid-cols-2' : 'md:grid-cols-1',
      )}
    >
      {module.modules.map((m) => (
        <ProductModule
          imageAspectClassName="aspect-[320/220]"
          key={m._key}
          layout={module.layout}
          module={m}
        />
      ))}
    </div>
  );
}
