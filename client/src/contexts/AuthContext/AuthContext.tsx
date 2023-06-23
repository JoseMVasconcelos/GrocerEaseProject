import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { useNavigate } from 'react-router'
import { decodeJWTToken } from '../../utils/decodeJWTToken'

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
  }

  async function handleLogin(credentials: LoginCredentials): Promise<void> {
    const {
      data: { token },
    } = await api.post('/login', credentials)

    localStorage.setItem('token', JSON.stringify(token))
    api.defaults.headers.Authorization = `Bearer ${token}`

    setUserData(decodeJWTToken(token))
    setIsAuthenticated(true)
    navigate('/shopping-lists')
  }

  async function handleLogout(): Promise<void> {
    await api.post('/logout')

    setIsAuthenticated(false)
    setUserData({} as UserData)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = null
    navigate('/shopping-lists')
  }

  async function handleEditUserData(
    credentials: SignUpCredentials,
  ): Promise<void> {
    const {
      data: { token },
    } = await api.patch('/users', credentials)

    localStorage.setItem('token', JSON.stringify(token))
    api.defaults.headers.Authorization = `Bearer ${token}`

    setUserData(decodeJWTToken(token))
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleLogin,
        handleLogout,
        handleEditUserData,
        userData,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
