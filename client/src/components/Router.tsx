import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Home } from '../pages/Home'
import { SignUp } from '../pages/SignUp'
import { Login } from '../pages/Login'
import { ShoppingLists } from '../pages/ShoppingLists'
import { ListDetails } from '../pages/ListDetails'
import { NotFound } from './NotFound'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopping-lists" element={<ShoppingLists />} />
        <Route path="/shopping-lists/:id" element={<ListDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
