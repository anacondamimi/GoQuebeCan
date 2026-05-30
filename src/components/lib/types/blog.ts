export interface BlogMetaSEO {
  title?: string;
  description?: string;
  keywords?: string | string[];
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
}

export type ExtendedBlogMetaItem<TBase> = TBase & BlogMetaSEO;
