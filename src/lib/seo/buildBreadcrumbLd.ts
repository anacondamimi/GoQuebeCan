export function buildBreadcrumbLd(items: { name: string; item: string }[]) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.goquebecan.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((el, i) => {
      const url = el.item.startsWith('http')
        ? el.item
        : `${baseUrl}${el.item.startsWith('/') ? '' : '/'}${el.item}`;

      return {
        '@type': 'ListItem',
        position: i + 1,
        name: el.name,
        item: url,
      };
    }),
  };
}
