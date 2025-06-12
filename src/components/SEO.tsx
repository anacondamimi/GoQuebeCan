import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  jsonLd?: boolean;
}

export const SEO = ({
  title,
  description,
  url,
  image,
  keywords = '',
  type = 'website',
  author = 'GoQuébeCan',
  publishedTime,
  jsonLd = false,
}: SEOProps) => {
  const structuredData =
    type === 'article' && jsonLd
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          headline: title,
          description,
          image: image || '',
          author: {
            '@type': 'Organization',
            name: author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'GoQuébeCan',
            logo: {
              '@type': 'ImageObject',
              url: 'https://goquebecan.com/images/logo.png',
            },
          },
          datePublished: publishedTime,
        }
      : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={url} />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Head>
  );
};
