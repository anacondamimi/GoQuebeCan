export interface BlogMetaSEO {
  keywords?: string | string[];
  publishedTime?: string; // ISO ex: "2025-09-20T10:00:00.000Z"
  modifiedTime?: string; // ISO
  locale?: string; // ex: "fr_CA"
}

export type ExtendedBlogMetaItem<TBase> = TBase & BlogMetaSEO;
