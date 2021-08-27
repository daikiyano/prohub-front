import { User } from '@/types/user'
import {
  getAuthUserDataFromStorage,
  removeAuthUserDataFromStorage,
  setAuthUserDataFromResponse
} from '@/utils/user-data'
import axios from "@/lib/axios"
import { AxiosResponse, AxiosError } from 'axios'

export const userLogin = async (email: string, password: string) => {
  return await axios.post<User>('/api/v1/public/auth/sign_in', { email, password })
    .then((res: AxiosResponse<User>) => {
      console.log(res.data)
      setAuthUserDataFromResponse(res.headers)
      return res
    })
    .catch((err: AxiosError) => {
      return err.response
    })
}

export const logout = async () => {
  return await axios.delete('/api/v1/admin_auth/sign_out', { headers: getAuthUserDataFromStorage() })
    .then(() => {
      removeAuthUserDataFromStorage()
    })
}

export const judgeAdminAuthToken = async () => {
  return await axios.get('/api/v1/admin_auth/validate_token', { headers: getAuthUserDataFromStorage() })
}

export const userSignup = async (email: string,username: string, password: string) => {
  return await axios.post<User>('/api/v1/public/auth', { email, username, password })
    .then((res: AxiosResponse<User>) => {
      console.log(res.data)
      setAuthUserDataFromResponse(res.headers)
      return res
    })
    .catch((err: AxiosError) => {
      return err.response
    })
}
