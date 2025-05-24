'use client';

import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedContentProps {
  children: React.ReactNode;
}

function AnimatedContent({ children }: AnimatedContentProps) {
  const container = useRef<HTMLDivElement>(null);
  const preferReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!container.current) {
        return;
      }

      if (preferReducedMotion) {
        gsap.set(container.current, {
          y: 0,
        });
        return;
      }

      gsap.fromTo(
        container.current,
        {
          y: 100,
        },
        {
          y: 0,
          ease: 'power2.inOut',
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom-=40%',
            toggleActions: 'play pause resume reverse',
            markers: false,
          },
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}

export default AnimatedContent;
