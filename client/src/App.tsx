import { Router } from './components/Router'
import { BrowserRouter } from 'react-router-dom'
import './styles/global-styles.css'
import { AuthContextProvider } from './contexts/AuthContext/AuthContext'
import { ShoppingListsContextProvider } from './contexts/ShoppingListsContext/ShoppingListsContext'

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
