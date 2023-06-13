import { Router } from './components/Router'
import { BrowserRouter } from 'react-router-dom'
import './styles/global-styles.css'

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
