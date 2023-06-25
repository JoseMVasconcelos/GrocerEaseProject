import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { useNavigate } from 'react-router'
import { decodeJWTToken } from '../../utils/decodeJWTToken'
import axios from 'axios'

interface LoginCredentials {
  email: string
  password: string
}

interface SignUpCredentials extends LoginCredentials {
  name: string
}

interface UserData {
  name: string
  email: string
  id: string
}

interface AuthContextType {
  handleSignUp: (userData: SignUpCredentials) => Promise<void>
  handleLogin: (userData: LoginCredentials) => Promise<void>
  handleLogout: () => Promise<void>
  handleEditUserData: (userData: SignUpCredentials) => Promise<void>
  apiError: string | null
  userData: UserData
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
  const [userData, setUserData] = useState<UserData>({} as UserData)
  const [apiError, setApiError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const rawToken = localStorage.getItem('token')

    if (rawToken) {
      const token = JSON.parse(rawToken)
      api.defaults.headers.Authorization = `Bearer ${token}`
      setUserData(decodeJWTToken(token))
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [])

  async function handleSignUp(credentials: SignUpCredentials): Promise<void> {
    try {
      const {
        data: { data: token },
      } = await api.post('/signUp', {
        ...credentials,
        confirm_password: credentials.password,
      })

      localStorage.setItem('token', JSON.stringify(token))
      api.defaults.headers.Authorization = `Bearer ${token}`

      setUserData(decodeJWTToken(token))
      setIsAuthenticated(true)
      navigate('/shopping-lists')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setApiError(error.response.data.message)
      } else {
        setApiError('erro! tente novamente mais tarde')
      }
    }
  }

  async function handleLogin(credentials: LoginCredentials): Promise<void> {
    try {
      const {
        data: { token },
      } = await api.post('/login', credentials)

      localStorage.setItem('token', JSON.stringify(token))
      api.defaults.headers.Authorization = `Bearer ${token}`

      setUserData(decodeJWTToken(token))
      setIsAuthenticated(true)
      navigate('/shopping-lists')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setApiError(error.response.data.message)
      } else {
        setApiError('erro! tente novamente mais tarde')
      }
    }
  }

  async function handleLogout(): Promise<void> {
    try {
      await api.post('/logout')

      setIsAuthenticated(false)
      setUserData({} as UserData)
      localStorage.removeItem('token')
      api.defaults.headers.Authorization = null
      navigate('/shopping-lists')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setApiError(error.response.data.message)
      } else {
        setApiError('tente novamente mais tarde')
      }
    }
  }

  async function handleEditUserData(
    credentials: SignUpCredentials,
  ): Promise<void> {
    try {
      const {
        data: { token },
      } = await api.patch('/users', credentials)

      localStorage.setItem('token', JSON.stringify(token))
      api.defaults.headers.Authorization = `Bearer ${token}`

      setUserData(decodeJWTToken(token))
      setIsAuthenticated(true)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setApiError(error.response.data.message)
      } else {
        setApiError('tente novamente mais tarde')
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleLogin,
        handleLogout,
        handleEditUserData,
        userData,
        apiError,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
