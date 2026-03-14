import React from 'react';
import Link from 'next/link';
import TableOfContents, { type TocItem } from '@/components/blog/TableOfContents';
import { NearbyDestinations } from '@/components/blog/NearbyDestinations';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

type QuickFact = {
  label: string;
  value: string;
};

type CtaLink = {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | 'soft';
  rel?: string;
  target?: '_blank' | '_self';
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type HeroData = {
  image?: React.ReactNode;
  eyebrow?: string;
  caption?: string;
};

type SeoIntroBlock = {
  title?: string;
  paragraphs: string[];
};

type ConclusionBlock = {
  title?: string;
  text: string;
  ctas?: CtaLink[];
};

type SectionIntro = {
  title?: string;
  text?: string;
};

export type DestinationArticleTemplateProps = {
  slug: string;
  title: string;
  subtitle?: string;

  breadcrumbs?: BreadcrumbItem[];
  hero?: HeroData;

  quickFacts?: QuickFact[];
  toc?: TocItem[];
  utilityLinks?: CtaLink[];

  intro?: SeoIntroBlock;

  beforeMainContent?: React.ReactNode;
  afterMainContent?: React.ReactNode;

  hotelSection?: React.ReactNode;
  restaurantSection?: React.ReactNode;
  mapSection?: React.ReactNode;
  affiliateSection?: React.ReactNode;
  faqSection?: React.ReactNode;

  hotelIntro?: SectionIntro;
  restaurantIntro?: SectionIntro;
  faqIntro?: SectionIntro;

  conclusion?: ConclusionBlock;

  showNearbyDestinations?: boolean;

  articleClassName?: string;
  contentClassName?: string;
  sidebarClassName?: string;

  children: React.ReactNode;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function CtaButton({ cta }: { cta: CtaLink }) {
  const base =
    'inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition shadow-sm sm:w-auto';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-indigo-600 bg-white text-indigo-700 hover:bg-indigo-50',
    soft: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 hover:bg-indigo-100',
  };

  return (
    <a
      href={cta.href}
      target={cta.target ?? '_self'}
      rel={cta.rel ?? (cta.target === '_blank' ? 'noopener noreferrer' : undefined)}
      className={cx(base, variants[cta.variant ?? 'primary'])}
    >
      {cta.label}
    </a>
  );
}

function Breadcrumbs({ items }: { items?: BreadcrumbItem[] }) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Fil d’Ariane" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-indigo-700">
                  {item.label}
                </Link>
              ) : (
                <span className={cx(isLast && 'font-semibold text-gray-800')}>{item.label}</span>
              )}
              {!isLast ? <span className="text-gray-300">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function HeroSection({
  title,
  subtitle,
  hero,
}: {
  title: string;
  subtitle?: string;
  hero?: HeroData;
}) {
  return (
    <header className="mb-10">
      {hero?.eyebrow ? (
        <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-indigo-700">
          {hero.eyebrow}
        </p>
      ) : null}

      <H1>{title}</H1>

      {subtitle ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">{subtitle}</p>
      ) : null}

      {hero?.image ? (
        <div className="mt-8 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div>{hero.image}</div>
          {hero.caption ? (
            <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
              {hero.caption}
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}

function QuickFactsSection({ slug, quickFacts }: { slug: string; quickFacts?: QuickFact[] }) {
  if (!quickFacts?.length) return null;

  return (
    <section
      id="resume-rapide"
      aria-label="Résumé rapide"
      className="mb-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold text-gray-900">Résumé rapide</p>
          <p className="mt-1 text-sm text-gray-500">
            Les informations essentielles à retenir avant de planifier votre visite.
          </p>
        </div>

        <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 ring-1 ring-gray-100">
          {slug.replace(/-/g, ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2">
        {quickFacts.map((fact) => (
          <div
            key={`${fact.label}-${fact.value}`}
            className="rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-gray-100"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {fact.label}
            </p>
            <p className="mt-1 text-sm font-bold leading-6 text-gray-900">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UtilityLinksSection({ utilityLinks }: { utilityLinks?: CtaLink[] }) {
  if (!utilityLinks?.length) return null;

  return (
    <section
      aria-label="Liens utiles"
      className="mb-10 rounded-2xl border border-gray-100 bg-gradient-to-b from-indigo-50/60 via-white to-white p-5 shadow-sm"
    >
      <p className="mb-2 text-sm font-extrabold text-gray-900">Préparer votre séjour</p>
      <p className="mb-4 text-sm leading-6 text-gray-600">
        Accédez rapidement aux outils et ressources les plus utiles pour organiser votre escapade.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {utilityLinks.map((link) => (
          <CtaButton key={`${link.href}-${link.label}`} cta={link} />
        ))}
      </div>
    </section>
  );
}

function IntroSection({ intro }: { intro?: SeoIntroBlock }) {
  if (!intro?.paragraphs?.length) return null;

  return (
    <section className="mb-12">
      {intro.title ? <H2 className="mb-5">{intro.title}</H2> : null}

      <div className="prose prose-gray max-w-none prose-p:leading-8 prose-p:text-gray-700">
        {intro.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function StandardSectionIntro({ id, title, text }: { id: string; title?: string; text?: string }) {
  if (!title && !text) return null;

  return (
    <section id={id} className="mb-6 scroll-mt-24">
      {title ? <H2>{title}</H2> : null}
      {text ? <p className="mt-3 text-base leading-8 text-gray-700">{text}</p> : null}
    </section>
  );
}

function ConclusionSection({ conclusion }: { conclusion?: ConclusionBlock }) {
  if (!conclusion) return null;

  return (
    <section className="mt-14 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white p-6 shadow-sm sm:p-8">
      <H2 className="mb-4">{conclusion.title ?? 'Conclusion'}</H2>

      <p className="text-base leading-8 text-gray-700">{conclusion.text}</p>

      {conclusion.ctas?.length ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {conclusion.ctas.map((cta) => (
            <CtaButton key={`${cta.href}-${cta.label}`} cta={cta} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function DesktopToc({ toc }: { toc?: TocItem[] }) {
  if (!toc?.length) return null;

  return (
    <aside className="hidden xl:block" aria-label="Sommaire de l’article">
      <div className="sticky top-24">
        <TableOfContents items={toc} />
      </div>
    </aside>
  );
}

function MobileToc({ toc }: { toc?: TocItem[] }) {
  if (!toc?.length) return null;

  return (
    <div className="mb-8 xl:hidden">
      <TableOfContents items={toc} />
    </div>
  );
}

export default function DestinationArticleTemplate({
  slug,
  title,
  subtitle,
  breadcrumbs,
  hero,
  quickFacts,
  toc,
  utilityLinks,
  intro,
  beforeMainContent,
  afterMainContent,
  hotelSection,
  restaurantSection,
  mapSection,
  affiliateSection,
  faqSection,
  hotelIntro,
  restaurantIntro,
  faqIntro,
  conclusion,
  showNearbyDestinations = true,
  articleClassName,
  contentClassName,
  sidebarClassName,
  children,
}: DestinationArticleTemplateProps) {
  return (
    <article className={cx('mx-auto max-w-6xl px-4 py-10 sm:py-12', articleClassName)}>
      <Breadcrumbs items={breadcrumbs} />
      <HeroSection title={title} subtitle={subtitle} hero={hero} />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className={cx('min-w-0', contentClassName)}>
          <MobileToc toc={toc} />
          <QuickFactsSection slug={slug} quickFacts={quickFacts} />
          <UtilityLinksSection utilityLinks={utilityLinks} />
          <IntroSection intro={intro} />

          {beforeMainContent ? <div className="mb-12">{beforeMainContent}</div> : null}

          <div className="prose prose-gray max-w-none prose-headings:scroll-mt-28 prose-p:leading-8 prose-a:font-semibold prose-a:text-indigo-700 hover:prose-a:text-indigo-800 prose-li:leading-8">
            {children}
          </div>

          {afterMainContent ? <div className="mt-12">{afterMainContent}</div> : null}

          {hotelSection ? (
            <div className="mt-14">
              <StandardSectionIntro
                id="ou-dormir"
                title={hotelIntro?.title}
                text={hotelIntro?.text}
              />
              {hotelSection}
            </div>
          ) : null}

          {restaurantSection ? (
            <div className="mt-14">
              <StandardSectionIntro
                id="ou-manger"
                title={restaurantIntro?.title}
                text={restaurantIntro?.text}
              />
              {restaurantSection}
            </div>
          ) : null}

          {mapSection ? <div className="mt-14">{mapSection}</div> : null}
          {affiliateSection ? <div className="mt-14">{affiliateSection}</div> : null}

          {faqSection ? (
            <div className="mt-14">
              <StandardSectionIntro id="faq" title={faqIntro?.title} text={faqIntro?.text} />
              {faqSection}
            </div>
          ) : null}

          <ConclusionSection conclusion={conclusion} />

          {showNearbyDestinations ? (
            <div className="mt-16">
              <NearbyDestinations currentSlug={slug} />
            </div>
          ) : null}
        </div>

        <div className={cx(sidebarClassName)}>
          <DesktopToc toc={toc} />
        </div>
      </div>
    </article>
  );
}
