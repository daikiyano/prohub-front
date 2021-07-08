export type Site = {
  name: string;
  description: string;
  url: string;
  price: string;
  image: string;
  createdAt: string;
}

export type SiteForRequest = Pick<Site, 'name' | 'description' | 'url' | 'price' | 'image'>
