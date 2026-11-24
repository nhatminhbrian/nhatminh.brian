import Image from 'next/image';
import type { ResolvedMedia } from '@/data/types';

type Props = {
  media: ResolvedMedia;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** fill the parent box (parent must be positioned) */
  fill?: boolean;
  imgClassName?: string;
};

export function Photo({ media, sizes, className, priority, fill, imgClassName }: Props) {
  if (fill) {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={media.blur}
        className={imgClassName ?? 'object-cover'}
      />
    );
  }
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={media.blur}
      className={className ?? 'h-auto w-full'}
    />
  );
}
