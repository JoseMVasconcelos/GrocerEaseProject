import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Home } from '../pages/Home'
import { SignUp } from '../pages/SignUp'
import { SignIn } from '../pages/SignIn'
import { ShoppingLists } from '../pages/ShoppingLists'
import { ListDetails } from '../pages/ListDetails'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/shopping-lists" element={<ShoppingLists />} />
        <Route path="/shopping-lists/:id" element={<ListDetails />} />
      </Route>
    </Routes>
  )
}
