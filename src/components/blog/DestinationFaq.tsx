'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqEntry } from '@/lib/seo/buildFaqLd';

type DestinationFaqProps = {
  items: FaqEntry[];
  sectionId?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function DestinationFaq({ items, sectionId = 'faq' }: DestinationFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items?.length) return null;

  return (
    <section
      id={sectionId}
      className="rounded-3xl bg-gradient-to-b from-slate-50 via-white to-white p-5 sm:p-8"
    >
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `${sectionId}-question-${index}`;
          const panelId = `${sectionId}-answer-${index}`;

          return (
            <article
              key={`${item.question}-${index}`}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-gray-50 sm:px-6"
                >
                  <span className="text-base font-bold leading-7 text-gray-900">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={cx(
                      'size-5 shrink-0 text-gray-500 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cx(
                  'grid transition-all duration-200 ease-out',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 px-5 py-4 text-sm leading-7 text-gray-700 sm:px-6 sm:text-base">
                    {item.answer}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
