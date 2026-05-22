/**
 * 🧠 Script de vérification globale avant le build
 * Compatible Windows PowerShell, Bash, VS Code et Vercel
 */

import { execSync } from 'node:child_process';
import chalk from 'chalk';

console.log(chalk.cyan.bold('\n🚀 Vérification complète du projet GoQuébeCAN...\n'));

let hasError = false;

function runCheck(command, label) {
  console.log(chalk.yellow(`▶️  Vérification ${label}...`));

  try {
    execSync(command, {
      stdio: 'inherit',
      shell: true,
    });

    console.log(chalk.green(`✅ ${label} OK\n`));
  } catch {
    console.error(chalk.red(`❌ ${label} a échoué.\n`));
    hasError = true;
  }
}

// runCheck('pnpm lint:dev', 'ESLint');
runCheck('pnpm typecheck', 'TypeScript');

if (hasError) {
  console.error(chalk.red.bold('\n❌ Des erreurs ont été détectées.\n'));
  console.log(chalk.yellow('💡 Corrige les erreurs ci-dessus avant de relancer le build.\n'));
  process.exit(1);
}

console.log(chalk.green.bold('\n🎉 Aucune erreur détectée, tout est prêt pour le build !\n'));
