import { ReactNode, createContext, useState } from 'react'
import { api } from '../../lib/axios'

interface LoginCredentials {
  email: string
  password: string
}

interface SignUpCredentials extends LoginCredentials {
  name: string
}

interface AuthContextType {
  handleSignUp: (userData: SignUpCredentials) => Promise<void>
  handleLogin: (userData: LoginCredentials) => Promise<void>
  handleLogout: (userToken: string) => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated] = useState(false)
  const [isLoading] = useState(true)

  async function handleSignUp(credentials: SignUpCredentials): Promise<void> {
    await api.post('/signUp', {
      ...credentials,
      confirm_password: credentials.password,
    })
  }

  async function handleLogin(credentials: LoginCredentials): Promise<void> {
    await api.post('/login', credentials)
  }

  async function handleLogout(userToken: string): Promise<void> {
    await api.post('/logout', {
      userData: userToken,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleLogin,
        handleLogout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
