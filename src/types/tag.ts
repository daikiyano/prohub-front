import Site from '@/types/site';
import Qiita from '@/types/qiita';
import Connpass from '@/types/connpass';



export interface Tag {
  id: number,
  name: string,
  icon_url?: string,
  followers_count?: number,
  items_count?: number
}

export interface TagShowForRequest {
  sites?: Site[],
  qiita?: Qiita[],
  connpass?: Connpass[]
  
}



