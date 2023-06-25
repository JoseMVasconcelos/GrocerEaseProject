import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext/AuthContext'

export function useAuthContext() {
  return useContext(AuthContext)
}
