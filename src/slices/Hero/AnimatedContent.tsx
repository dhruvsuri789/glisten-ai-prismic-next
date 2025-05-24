'use client';

import ButtonLink from '@/components/ButtonLink';
import StarGrid from '@/components/StarGrid';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useGSAP } from '@gsap/react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface AnimatedContentProps {
  slice: Content.HeroSlice;
}

function AnimatedContent({ slice }: AnimatedContentProps) {
  const container = useRef<HTMLDivElement>(null);
  const preferReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!container.current) {
        return;
      }

      if (preferReducedMotion) {
        gsap.set('.hero__image, .hero__glow, .hero__button, .hero__body, .hero__heading', {
          opacity: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.inOut',
        },
      });

      // Opacity is already zero on initial render. Its in the tailwind classes
      tl.fromTo('.hero__heading', { scale: 0.5 }, { scale: 1, opacity: 1, duration: 1.4 });
      tl.fromTo('.hero__body', { y: 20 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.6');
      tl.fromTo('.hero__button', { scale: 1.5 }, { scale: 1, opacity: 1, duration: 1.3 }, '-=0.8');
      tl.fromTo('.hero__image', { y: 100 }, { y: 0, opacity: 1, duration: 1.3 }, '+=0.3');
      tl.fromTo('.hero__glow', { scale: 0.5 }, { scale: 1, opacity: 1, duration: 1.8 }, '-=1');
    },
    { scope: container },
  );

  return (
    <div className="relative" ref={container}>
      <StarGrid />
      {isFilled.richText(slice.primary.heading) && (
        <h1 className="hero__heading text-5xl font-medium text-balance opacity-0 md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h1>
      )}
      {isFilled.richText(slice.primary.body) && (
        <div className="hero__body mx-auto mt-6 max-w-md text-xl text-balance text-slate-300 opacity-0">
          <PrismicRichText field={slice.primary.body} />
        </div>
      )}
      {isFilled.link(slice.primary.button_link) && isFilled.keyText(slice.primary.button_label) && (
        <ButtonLink field={slice.primary.button_link} className="hero__button mt-8 opacity-0">
          {slice.primary.button_label}
        </ButtonLink>
      )}
      {isFilled.image(slice.primary.image) && (
        <div className="glass-container hero__image mt-16 w-fit opacity-0">
          <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl" />
          <PrismicNextImage field={slice.primary.image} className="rounded-lg" />
        </div>
      )}
    </div>
  );
}

export default AnimatedContent;
