import Bounded from '@/components/Bounded';
import ButtonLink from '@/components/ButtonLink';
import { Content } from '@prismicio/client';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';
import PlainLogo from './PlainLogo';

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-32 text-center font-medium md:py-40"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px]" />
      <div className="glass-container rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 p-4 md:rounded-xl">
        <PlainLogo />
      </div>
      <h2 className="mx-auto mt-8 max-w-2xl text-center text-5xl font-medium text-balance md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>
      <ButtonLink field={slice.primary.button_link} className="mt-6">
        {slice.primary.button_text || 'Get Started'}
      </ButtonLink>
    </Bounded>
  );
};

export default CallToAction;
