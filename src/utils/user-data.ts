import { AuthHeaders } from '@/types/auth'
import { User } from '@/types/user'


export const getAuthUserDataFromStorage = (): AuthHeaders => {
  return {
    'access-token': localStorage.getItem('access-token'),
    'client': localStorage.getItem('client'),
    'expiry': localStorage.getItem('expiry'),
    'uid': localStorage.getItem('uid'),
    'Content-Type': 'application/json'
  }
}

export const setAuthUserDataFromResponse = (authData: AuthHeaders): void => {
  if (authData['access-token'] && authData['client'] && authData['uid'] && authData['expiry']) {
    localStorage.setItem('access-token', authData['access-token'])
    localStorage.setItem('client', authData['client'])
    localStorage.setItem('uid', authData['uid'])
    localStorage.setItem('expiry', authData['expiry'])
  }
}

export const removeAuthUserDataFromStorage = (): void => {
  localStorage.removeItem('access-token')
  localStorage.removeItem('client')
  localStorage.removeItem('uid')
  localStorage.removeItem('expiry')
  localStorage.removeItem('admin')
}
