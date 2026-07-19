import Image from 'next/image';
import Link from 'next/link';

import { partnerGroups, partners } from '@/data/partners';

const fallbackLogo = '/images/logo.avif';
const fallbackImage = '/images/page-accueil.avif';

export default function PartnersGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      

      <div className="space-y-10">
        {partnerGroups.map((group) => {
          const groupPartners = partners.filter((partner) => partner.category === group.key);

          return (
            <div
              key={group.key}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-secondary">{group.title}</h3>
                <p className="mt-2 text-sm text-neutral">{group.description}</p>
              </div>

              {groupPartners.length === 0 ? (
                <p className="rounded-2xl bg-gray-50 px-5 py-4 text-sm text-neutral">
                  De nouveaux partenaires seront ajoutés prochainement.
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {groupPartners.map((partner) => (
                    <Link
                      key={partner.id}
                      href={partner.url}
                      target={partner.url.startsWith('http') ? '_blank' : undefined}
                      rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[170px_1fr]"
                    >
                      <div className="relative min-h-[180px] bg-gray-100">
                        <Image
                          src={partner.image || fallbackImage}
                          alt={`Photo associée à ${partner.name}`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-5">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <Image
                              src={partner.logo || fallbackLogo}
                              alt={`Logo ${partner.name}`}
                              fill
                              className="object-contain p-2"
                            />
                          </div>

                          <div>
                            <h4 className="text-lg font-bold text-secondary">{partner.name}</h4>


                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-neutral">
                          {partner.description}
                        </p>

                        <span className="mt-4 inline-block text-sm font-semibold text-primary">
                          Visiter le site →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
