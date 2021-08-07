import {
  getAuthUserDataFromStorage
} from '@/utils/user-data'
import { AxiosResponse } from 'axios'
import axios from "@/lib/axios"

export const createArticle = async (formData: any) => {
  return await axios.post(
    '/api/v1/public/articles', formData,
    {
      headers: getAuthUserDataFromStorage()
    }
  )
    .then((res: AxiosResponse) => {
      return res.data
    })
}