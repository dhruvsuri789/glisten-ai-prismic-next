'use client';

import ButtonLink from '@/components/ButtonLink';
import WordMark from '@/components/WordMark';
import { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';

interface NavBarProps {
  settings: Content.SettingsDocument;
}

export default function NavBar({ settings }: NavBarProps) {
  return (
    <nav aria-label="Main" className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <Link href={'/'}>
          <WordMark />
          <span className="sr-only">Glisten.ai Home Page</span>
        </Link>

        <ul className="flex gap-6">
          {settings.data.navigation.map((item, index) => {
            if (item.cta_button) {
              return (
                <li key={`${index} - ${item.label}`}>
                  <ButtonLink field={item.link}>{item.label}</ButtonLink>
                </li>
              );
            }

            return (
              <li key={`${index} - ${item.label}`}>
                <PrismicNextLink field={item.link} className="inline-flex min-h-11 items-center">
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
