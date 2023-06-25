import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { useNavigate } from 'react-router'
import { decodeJWTToken } from '../utils/decodeJWTToken'
import {
  LoginCredentials,
  SignUpCredentials,
  editUserData,
  login,
  logout,
  signUp,
} from '../services/authentication'

interface AuthContextType {
  handleSignUp: (userData: SignUpCredentials) => Promise<void>
  handleLogin: (userData: LoginCredentials) => Promise<void>
  handleLogout: () => Promise<void>
  handleEditUserData: (userData: SignUpCredentials) => Promise<void>
  username: string
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const rawToken = localStorage.getItem('token')

    if (rawToken) {
      const token = JSON.parse(rawToken)
      api.defaults.headers.Authorization = `Bearer ${token}`
      setUsername(decodeJWTToken(token).name)
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [])

  async function handleSignUp(credentials: SignUpCredentials): Promise<void> {
    const username = await signUp(credentials)
    setUsername(username)
    setIsAuthenticated(true)
    navigate('/shopping-lists')
  }

  async function handleLogin(credentials: LoginCredentials): Promise<void> {
    const username = await login(credentials)
    setUsername(username)
    setIsAuthenticated(true)
    navigate('/shopping-lists')
  }

  async function handleLogout(): Promise<void> {
    await logout()
    setIsAuthenticated(false)
    setUsername('')
    navigate('/shopping-lists')
  }

  async function handleEditUserData(
    credentials: SignUpCredentials,
  ): Promise<void> {
    const username = await editUserData(credentials)
    setUsername(username)
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleLogin,
        handleLogout,
        handleEditUserData,
        username,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
