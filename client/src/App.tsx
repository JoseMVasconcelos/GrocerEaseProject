import { Router } from './components/Router'
import { BrowserRouter } from 'react-router-dom'
import './styles/global-styles.css'
import { AuthContextProvider } from './contexts/AuthContext'
import { ShoppingListsContextProvider } from './contexts/ShoppingListsContext'

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ShoppingListsContextProvider>
          <Router />
        </ShoppingListsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
