/**
 * 🧠 Script de vérification globale des erreurs avant le build
 * Affiche toutes les erreurs TypeScript + ESLint en parallèle
 * Compatible PowerShell, Bash et VS Code
 */

import { execSync } from 'node:child_process';
import chalk from 'chalk';

console.log(chalk.cyan.bold('\n🚀 Vérification complète du projet GoQuébeCAN...\n'));

let hasError = false;

// Fonction utilitaire pour exécuter une commande et gérer les erreurs
function runCheck(command, label) {
  console.log(chalk.yellow(`▶️  Vérification ${label}...`));
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green(`✅ ${label} OK\n`));
  } catch (err) {
    console.error(chalk.red(`❌ ${label} a échoué.\n`));
    hasError = true;
  }
}

runCheck('next lint', 'ESLint');
runCheck('tsc --noEmit', 'TypeScript');

if (hasError) {
  console.error(chalk.red.bold('\n❌ Des erreurs ont été détectées.\n'));
  console.log(
    chalk.yellow('💡 Conseil : Corrige les erreurs ci-dessus avant de lancer "pnpm build".\n'),
  );
  process.exit(1);
} else {
  console.log(chalk.green.bold('\n🎉 Aucune erreur détectée, tout est prêt pour le build !\n'));
}
