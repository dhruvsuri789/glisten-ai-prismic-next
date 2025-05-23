import { cn } from '@/lib/utils';
import { PrismicNextLink, PrismicNextLinkProps } from '@prismicio/next';

export default function ButtonLink({ className, ...restProps }: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={cn(
        'inline-flex h-fit w-fit rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 ring-yellow-300 transition-colors outline-none after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100/0 after:blur-md after:transition-all after:duration-500 last-of-type:relative hover:border-yellow-200/40 hover:text-yellow-300 hover:after:bg-yellow-100/15 focus-visible:ring-1 focus-visible:ring-offset-1',
        className,
      )}
      {...restProps}
    />
  );
}
