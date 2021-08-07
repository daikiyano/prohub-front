import Tag from '@/types/tag';
import SiteComment from '@/types/tag';


export type Site = {
  id?: number;
  image_url?: string;
  admin_id?: number 
  name: string;
  description: string;
  url: string;
  price: string;
  tags?: Tag[];
  site_comments?: SiteComment[];
}

export type SiteForRequest = Pick<Site, 'name' | 'description' | 'url' | 'price'>
export type SiteForIndex = Pick<Site, 'id' | 'image_url' | 'name' | 'tags'>

