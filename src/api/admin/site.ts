import { Site } from '@/types/site'
import {
  getAuthDataFromStorage
} from '@/utils/auth-data'
import { AxiosResponse } from 'axios'
import axios from "@/lib/axios"

export const createSite = async (formData: any) => {
  return await axios.post(
    '/api/v1/admin/sites', formData,
    {
      headers: getAuthDataFromStorage()
    }
  )
    .then((res: AxiosResponse<Site>) => {
      return res.data
    })
}

export const updateSite = async (formData: any,params: any) => {
  return await axios.patch(
    `/api/v1/admin/sites/${params}`, formData,
    {
      headers: getAuthDataFromStorage()
    }
  )
    .then((res: AxiosResponse<Site>) => {
      return res.data
    })
}

export const deleteSite = async (params: any) => {
  return await axios.delete(
    `/api/v1/admin/sites/${params}`,
    {
      headers: getAuthDataFromStorage()
    }
  )
    .then((res: AxiosResponse<Site>) => {
      return res.data
    })
}