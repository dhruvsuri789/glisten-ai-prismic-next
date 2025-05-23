import Bounded from '@/components/Bounded';
import { cn } from '@/lib/utils';
import { createClient } from '@/prismicio';
import { asText, Content, isFilled } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, PrismicText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies: FC<CaseStudiesProps> = async ({ slice }) => {
  const client = createClient();
  const caseStudies = await Promise.all(
    slice.primary.case_studies.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study))
        return await client.getByID<Content.CaseStudyDocument>(item.case_study.id);
    }),
  );

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <h2 className="max-w-2xl text-center text-5xl font-medium text-balance md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-lg text-center text-xl text-balance text-slate-300">
        <PrismicText field={slice.primary.body} />
      </div>

      <div className="mt-20 grid gap-16">
        {caseStudies &&
          caseStudies.map(
            (caseStudy, index) =>
              caseStudy && (
                <div
                  key={`${index} - ${caseStudy.data.company}`}
                  className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
                >
                  <div className="col-span-1 flex flex-col justify-center gap-4">
                    <h3 className="text-4xl">
                      <PrismicText field={caseStudy.data.company} />
                    </h3>
                    <div className="max-w-md text-slate-300">
                      <PrismicRichText field={caseStudy.data.description} />
                    </div>
                    <PrismicNextLink
                      document={caseStudy}
                      className="after:absolute after:inset-0 hover:underline"
                    >
                      Read {asText(caseStudy.data.company)} case study
                    </PrismicNextLink>
                  </div>
                  <PrismicNextImage
                    field={caseStudy.data.logo}
                    quality={100}
                    className={cn(
                      'rounded-xl lg:col-span-2',
                      index % 2 === 0 ? 'md:order-1' : 'md:-order-1',
                    )}
                  />
                </div>
              ),
          )}
      </div>
    </Bounded>
  );
};

export default CaseStudies;
