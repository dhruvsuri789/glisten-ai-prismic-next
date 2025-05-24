'use client';

import ButtonLink from '@/components/ButtonLink';
import WordMark from '@/components/WordMark';
import { cn } from '@/lib/utils';
import { asLink, Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';

interface NavBarProps {
  settings: Content.SettingsDocument;
}

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href={'/'} className="z-50" onClick={() => setOpen(false)}>
            <WordMark />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
        {/* Mobile Nav */}
        <div
          className={cn(
            'fixed top-0 right-0 bottom-0 left-auto z-40 flex w-full max-w-[50%] flex-col items-center gap-4 bg-[#070815] pt-18 pr-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <button
            type="button"
            className="fixed top-6 right-4 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>
          <ul className="flex flex-col items-center justify-start gap-8">
            {settings.data.navigation.map((item, index) => {
              if (item.cta_button) {
                return (
                  <li key={`${index} - ${item.label}`}>
                    <ButtonLink
                      field={item.link}
                      onClick={() => setOpen(false)}
                      aria-current={
                        pathname.includes(asLink(item.link) as string) ? 'page' : undefined
                      }
                    >
                      {item.label}
                    </ButtonLink>
                  </li>
                );
              }

              return (
                <li key={`${index} - ${item.label}`}>
                  <PrismicNextLink
                    field={item.link}
                    className="block px-3 text-2xl first:mt-8"
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string) ? 'page' : undefined
                    }
                  >
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item, index) => {
            if (item.cta_button) {
              return (
                <li key={`${index} - ${item.label}`}>
                  <ButtonLink
                    field={item.link}
                    aria-current={
                      pathname.includes(asLink(item.link) as string) ? 'page' : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              );
            }

            return (
              <li key={`${index} - ${item.label}`}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                  aria-current={pathname.includes(asLink(item.link) as string) ? 'page' : undefined}
                >
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
