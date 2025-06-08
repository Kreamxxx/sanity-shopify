import clsx from 'clsx';

import ImageModule from '~/components/modules/Image';
import type {SanityModuleImages} from '~/lib/sanity';

type Props = {
  module: SanityModuleImages;
};

export default function ImagesModule({module}: Props) {
  if (!Array.isArray(module.modules)) {
    return null;
  }

  const multipleImages = module.modules.length > 1;
  let alignClass;
  switch (module.verticalAlign) {
    case 'bottom':
      alignClass = 'items-end';
      break;
    case 'center':
      alignClass = 'items-center';
      break;
    case 'top':
      alignClass = 'items-start';
      break;
  }

  return (
    <div
      className={clsx(
        'my-16',
        module.fullWidth && '-mx-8 w-screen px-6 md:px-8',
      )}
    >
      <div
        className={clsx(
          'mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8',
          multipleImages ? 'md:grid-cols-2' : 'md:grid-cols-1',
          alignClass,
        )}
      >
        {module.modules.map((mod) => (
          <ImageModule key={mod._key} module={mod} />
        ))}
      </div>
    </div>
  );
}
