export function buildBreadcrumbLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((el, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: el.name,
      item: el.item,
    })),
  };
}
