// scripts/check-ssr.js

import { exec } from 'child_process';

console.log('🔍 Vérification des erreurs SSR...');

exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Erreur de build détectée:');
    console.error(stderr);

    if (stderr.includes('window is not defined')) {
      console.log('\n💡 Suggestions:');
      console.log('1. Vérifiez que tous les composants utilisant window sont wrappés avec dynamic()');
      console.log('2. Utilisez useEffect() pour les appels window/document/localStorage');
      console.log('3. Ajoutez des vérifications typeof window !== "undefined"');
    }

    process.exit(1);
  } else {
    console.log('✅ Build réussi - Pas d\'erreur SSR détectée');
  }
});
