import { SiteComment } from '@/types/site-comment'
import {
  getAuthUserDataFromStorage
} from '@/utils/user-data'
import { AxiosResponse } from 'axios'
import axios from "@/lib/axios"

export const createSiteComment = async (formData: any,params: string | string[]) => {
  return await axios.post(
    `/api/v1/public/sites/${params}/site_comments`, formData,
    {
      headers: getAuthUserDataFromStorage()
    }
  )
    .then((res: AxiosResponse<SiteComment>) => {
      return res.data
    })
}

// export const updateSite = async (formData: any,params: any) => {
//   return await axios.patch(
//     `/api/v1/admin/sites/${params}`, formData,
//     {
//       headers: getAuthAdminDataFromStorage()
//     }
//   )
//     .then((res: AxiosResponse<Site>) => {
//       return res.data
//     })
// }

// export const deleteSite = async (params: any) => {
//   return await axios.delete(
//     `/api/v1/admin/sites/${params}`,
//     {
//       headers: getAuthAdminDataFromStorage()
//     }
//   )
//     .then((res: AxiosResponse<Site>) => {
//       return res.data
//     })
// }