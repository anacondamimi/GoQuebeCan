// scripts/seoTemplate.js

/**
 * Génère le prompt SEO ultime pour la destination
 * @param {{destination: string, slug: string, lat: number, lng: number}} params
 * @returns {string}
 */
module.exports = function buildSEOPrompt({ destination, slug, lat, lng }) {
  return `🌟 PROMPT ULTIME 2025: Création d'article SEO haute performance pour destination touristique
  Créez un article détaillé et optimisé pour le référencement naturel sur la destination touristique ${destination}, en appliquant les techniques SEO de pointe de 2025.
  Cet article doit:
  
  Dominer les SERPs pour les requêtes à forte intention commerciale et informationnelle
  Satisfaire pleinement l'algorithme SGE (Search Generative Experience) de Google
  Répondre aux critères E-E-A-T renforcés (Expérience, Expertise, Autorité, Fiabilité)
  Optimiser les signaux d'engagement et Core Web Vitals pour le classement mobile-first
  Structurer l'information pour maximiser l'extraction de données par l'IA de Google
  
  **Métadonnées à inclure**
  - slug: "${slug}"
  - ville: "${destination}"
  - resume: Bref résumé attractif pour SEO et carte interactive
  - lat: ${lat}
  - lng: ${lng}
  
  **Structure recommandée (minimum 1500 mots)**
  1. Titre optimisé SEO (55-65 caractères), format: "${destination} 2025 : [Bénéfice spécifique] (Guide Local)"
  2. Introduction (100-120 mots) avec wordings pour featured snippet et FAQ position 0
  3. H2/Listicle: "🔍 Pourquoi ${destination} ?" + 5 raisons avec H3
  4. H2: "🏄‍♂️ Top 10 des activités à ${destination} par saison" (H3 par saison + nested H4)
  5. H2: "👨‍👩‍👧‍👦 Guide par profil de voyageur"
  6. H2: "🏨 Où loger à ${destination}"
  7. H2: "🍽️ Guide gastronomique"
  8. H2: "🚗 Plan d'accès complet"
  9. H2: "📅 Planificateur saisonnier"
  10. Conclusion PACE + double CTA + question ouverte
  
  **Règles SEO**
  - Mots-clés principaux en début de titre et intro
  - Balises HTML: H1...H4
  - Listes à puces, tableaux, accordéons
  - FAQ schema
  - Alt tags descriptifs
  
  L'article final doit être du JSX complet pour un composant React export default, avec export const metadata en en-tête.`;
};
