export type Site = {
  id: number;
  image_url: string;
  updated_at: string;
  admin_id: number;
  name: string;
  description: string;
  url: string;
  price: string;
  image: string;
  createdAt: string;
}

export type SiteForRequest = Pick<Site, 'name' | 'description' | 'url' | 'price' | 'image'>
