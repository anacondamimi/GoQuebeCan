// scripts/check-navbar-routes.cjs
(async () => {
  const { default: fetch } = await import('node-fetch');

  const BASE_URL = 'http://localhost:3000';

  const NAV_ROUTES = [
    '/',
    '/experiences',
    '/blog/location-vr',
    '/producteurs',
    '/camping',
    '/planificateur',
    '/videos',
    '/vols',
    '/offres',
    '/contact',
    '/itineraires-communaute',
  ];

  const errors = [];

  for (const route of NAV_ROUTES) {
    const res = await fetch(BASE_URL + route, { redirect: 'manual' });

    if (res.status === 404) {
      errors.push({ route, status: res.status });
    }
  }

  if (errors.length) {
    console.error('❌ Liens Navbar en erreur :');
    console.table(errors);
    process.exit(1);
  }

  console.log('✅ Tous les liens Navbar sont valides');
})();
