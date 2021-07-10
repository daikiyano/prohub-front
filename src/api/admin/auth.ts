import { AdminUser } from '@/types/admin-user'
import {
  getAuthDataFromStorage,
  removeAuthDataFromStorage,
  setAuthAdminDataFromResponse
} from '@/utils/auth-data'
import axios from "@/lib/axios"
import { AxiosResponse, AxiosError } from 'axios'

export const login = async (email: string, password: string) => {
  return await axios.post<AdminUser>('/api/v1/admin_auth/sign_in', { email, password })
    .then((res: AxiosResponse<AdminUser>) => {
      console.log(res.data)
      setAuthAdminDataFromResponse(res.headers,res.data)
      return res
    })
    .catch((err: AxiosError) => {
      return err.response
    })
}

export const logout = async () => {
  return await axios.delete('/api/v1/admin_auth/sign_out', { headers: getAuthDataFromStorage() })
    .then(() => {
      removeAuthDataFromStorage()
    })
}

export const judgeAdminAuthToken = async () => {
  return await axios.get('/api/v1/admin_auth/validate_token', { headers: getAuthDataFromStorage() })
}