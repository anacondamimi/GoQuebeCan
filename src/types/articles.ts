/**
 * types/article.ts
 * Types structurants pour les articles de GoQuebeCan
 * Crée le 2025-07-04
 */

export type Article = {
  /**
   * Titre affiché dans les menus, carrousels et pages articles
   * Ex: "Magog Orford"
   */
  title: string;

  /**
   * Slug utilisé dans l'URL
   * Ex: "magog-orford"
   */
  slug: string;

  /**
   * Si l'article est publié ou en cours de rédaction
   * true = visible et cliquable, false = grisé dans le menu
   */
  published?: boolean;

  /**
   * Brève description pour affichage dans les aperçus et SEO
   * Ex: "Découverte des plages et montagnes de Magog Orford"
   */
  description?: string;

  /**
   * URL de l'image de couverture (WebP ou AVIF de préférence)
   * Ex: "/images/blog/magog-orford.avif"
   */
  image?: string;

  /**
   * Date de publication ISO, pour gérer le badge "Nouveau"
   * Ex: "2025-07-04"
   */
  date?: string;

  /**
   * Tags ou catégories associés pour le filtrage ou le SEO
   * Ex: ["Montagne", "Plage", "Cantons-de-l'Est"]
   */
  tags?: string[];
};

export type Region = {
  /**
   * Nom de la région (ex: "Cantons-de-l'Est")
   */
  title: string;

  /**
   * Slug utilisé dans l'URL (ex: "cantons")
   */
  slug: string;

  /**
   * Liste des articles associés à cette région
   */
  articles: Article[];
};
