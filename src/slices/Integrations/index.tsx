import Bounded from '@/components/Bounded';
import { Content } from '@prismicio/client';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';
import React, { FC } from 'react';
import background from './background.jpg';
import StarBackground from './StarBackground';
import StylizedLogoMark from './StylizedLogoMark';

import { cn } from '@/lib/utils';
import { FaCloudflare, FaDigitalOcean, FaFigma, FaFly, FaGithub, FaNpm } from 'react-icons/fa6';

const icons = {
  digitalocean: <FaDigitalOcean />,
  cloudflare: <FaCloudflare />,
  github: <FaGithub />,
  figma: <FaFigma />,
  npm: <FaNpm />,
  fly: <FaFly />,
};

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
        <div className="mt-20 flex flex-col items-center md:flex-row">
          {slice.primary.icons.map((item, index) => (
            <React.Fragment key={`${index} - ${item.icon}`}>
              {/* Halfway point */}
              {index === Math.floor(slice.primary.icons.length / 2) && (
                <>
                  <StylizedLogoMark />
                  <div className="signal-line rotate-180 bg-gradient-to-t" />
                </>
              )}
              <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
                {icons[item.icon]}
              </div>
              {index != slice.primary.icons.length - 1 && (
                <div
                  className={cn(
                    'signal-line',
                    index >= Math.floor(slice.primary.icons.length / 2) ? 'rotate-180' : 'rotate-0',
                  )}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Integrations;
