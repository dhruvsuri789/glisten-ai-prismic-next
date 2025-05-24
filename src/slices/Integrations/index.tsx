import Bounded from '@/components/Bounded';
import { Content } from '@prismicio/client';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';
import { FC } from 'react';
import AnimatedContent from './AnimatedContent';
import background from './background.jpg';
import StarBackground from './StarBackground';

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations: FC<IntegrationsProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Integrations bakground image"
          fill
          className="object-cover"
          quality={90}
          priority={false}
        />
      </div>

      <StarBackground />
      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-center text-5xl font-medium text-balance md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="mx-auto mt-6 max-w-lg text-center text-xl text-balance text-slate-300">
          <PrismicText field={slice.primary.body} />
        </div>

        <AnimatedContent slice={slice} />
      </div>
    </Bounded>
  );
};

export default Integrations;
