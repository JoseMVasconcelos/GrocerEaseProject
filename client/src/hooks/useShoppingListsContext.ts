import { useContext } from 'react'
import { ShoppingListsContext } from '../contexts/ShoppingListsContext/ShoppingListsContext'

export function useShoppingListsContext() {
  return useContext(ShoppingListsContext)
}
