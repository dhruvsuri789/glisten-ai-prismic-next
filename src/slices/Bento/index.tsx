import Bounded from '@/components/Bounded';
import { cn } from '@/lib/utils';
import { asText, Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, PrismicText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento: FC<BentoProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-center text-5xl font-medium text-balance md:text-7xl">
                {children}
              </h2>
            ),
            em: ({ children }) => (
              <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent not-italic">
                {children}
              </em>
            ),
          }}
        />
        <div className="mx-auto mt-6 max-w-lg text-center text-xl text-balance text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>
        <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
          {slice.primary.card.map((item, index) => (
            <div
              key={`${index} - ${asText(item.title)}`}
              className={cn(
                'glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4',
                item.wide ? 'md:col-span-2' : 'md:col-span-1',
              )}
            >
              <h3 className="text-2xl">
                <PrismicText field={item.title} />
              </h3>
              <div className="max-w-md text-balance text-slate-300">
                <PrismicRichText field={item.body} />
              </div>
              <PrismicNextImage field={item.image} className="max-h-36 w-auto rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Bento;
