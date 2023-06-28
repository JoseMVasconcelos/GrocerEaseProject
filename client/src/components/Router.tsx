import { Routes, Route, Navigate } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Home } from '../pages/Home'
import { SignUp } from '../pages/SignUp'
import { Login } from '../pages/Login'
import { ShoppingLists } from '../pages/ShoppingLists'
import { ListDetails } from '../pages/ListDetails'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopping-lists" element={<ShoppingLists />} />
        <Route path="/shopping-lists/:id" element={<ListDetails />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
