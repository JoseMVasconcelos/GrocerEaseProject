import { useContext } from 'react'
import { ShoppingListsContext } from '../contexts/ShoppingListsContext'

export function useShoppingListsContext() {
  return useContext(ShoppingListsContext)
}
