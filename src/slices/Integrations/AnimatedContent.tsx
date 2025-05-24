'use client';

import { cn } from '@/lib/utils';
import { Content } from '@prismicio/client';
import React from 'react';
import StylizedLogoMark from './StylizedLogoMark';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { FaCloudflare, FaDigitalOcean, FaFigma, FaFly, FaGithub, FaNpm } from 'react-icons/fa6';

const icons = {
  digitalocean: <FaDigitalOcean />,
  cloudflare: <FaCloudflare />,
  github: <FaGithub />,
  figma: <FaFigma />,
  npm: <FaNpm />,
  fly: <FaFly />,
};

gsap.registerPlugin(useGSAP);

interface AnimatedContentProps {
  slice: Content.IntegrationsSlice;
}

export default function AnimatedContent({ slice }: AnimatedContentProps) {
  const container = useRef<HTMLDivElement>(null);
  const preferReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!container.current) {
        return;
      }

      if (preferReducedMotion) {
        return;
      }

      const tl = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: 'power2.inOut',
        },
      });

      tl.to('.pulsing-logo', {
        keyframes: [
          { filter: 'brightness(2)', opacity: 1, duration: 0.4, ease: 'power2.in' },
          { filter: 'brightness(1)', opacity: 0.7, duration: 0.9 },
        ],
      });

      tl.to(
        '.signal-line',
        {
          keyframes: [
            { backgroundPosition: '0% 0%' },
            {
              backgroundPosition: '100% 100%',
              stagger: { from: 'center', each: 0.3 },
              duration: 1,
            },
          ],
        },
        '-=1.4',
      );

      tl.to(
        '.pulsing-icon',
        {
          keyframes: [
            { opacity: 1, stagger: { from: 'center', each: 0.3 }, duration: 1 },
            { opacity: 0.4, stagger: { from: 'center', each: 0.3 }, duration: 1 },
          ],
        },
        '-=2',
      );
    },
    { scope: container },
  );

  return (
    <div className="mt-20 flex flex-col items-center md:flex-row" ref={container}>
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
  );
}
