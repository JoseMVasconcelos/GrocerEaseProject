import { api } from '../lib/axios'
import { decodeJWTToken } from '../utils/decodeJWTToken'

export interface SignUpCredentials {
  name: string
  email: string
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<string> {
  const {
    data: { data: token },
  } = await api.post('/signUp', {
    ...credentials,
    confirm_password: credentials.password,
  })

  localStorage.setItem('token', JSON.stringify(token))
  api.defaults.headers.Authorization = `Bearer ${token}`

  return decodeJWTToken(token).name
}

export async function login(credentials: LoginCredentials) {
  const {
    data: { token },
  } = await api.post('/login', credentials)

  localStorage.setItem('token', JSON.stringify(token))
  api.defaults.headers.Authorization = `Bearer ${token}`

  return decodeJWTToken(token).name
}

export async function logout() {
  await api.post('/logout')
  localStorage.removeItem('token')
  api.defaults.headers.Authorization = null
}

export async function editUserData(credentials: SignUpCredentials) {
  const {
    data: { token },
  } = await api.patch('/users', credentials)

  localStorage.setItem('token', JSON.stringify(token))
  api.defaults.headers.Authorization = `Bearer ${token}`

  return decodeJWTToken(token).name
}
