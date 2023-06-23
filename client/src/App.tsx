import { Router } from './components/Router'
import { BrowserRouter } from 'react-router-dom'
import './styles/global-styles.css'
import { AuthContextProvider } from './contexts/AuthContext/AuthContext'

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  )
}
