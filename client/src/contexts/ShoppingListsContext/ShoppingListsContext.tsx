import { ReactNode, createContext, useState, useCallback } from 'react'

import {
  NewList,
  ShoppingList,
  createList,
  deleteList,
  fetchLists,
} from '../../services/shoppingLists'

interface ShoppingListsContextType {
  onFetchLists: () => Promise<void>
  onCreateList: (newList: NewList) => Promise<void>
  onDeleteList: (listId: string) => Promise<void>
  shoppingLists: ShoppingList[]
}

interface ShoppingListsContextProviderProps {
  children: ReactNode
}

export const ShoppingListsContext = createContext(
  {} as ShoppingListsContextType,
)

export function ShoppingListsContextProvider({
  children,
}: ShoppingListsContextProviderProps) {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])

  const onFetchLists = useCallback(async () => {
    const lists = await fetchLists()
    setShoppingLists(lists)
  }, [])

  async function onCreateList(newList: NewList) {
    const { name, description, id } = await createList(newList)
    setShoppingLists((lists) => [...lists, { name, description, id }])
  }

  async function onDeleteList(listId: string) {
    await deleteList(listId)
    setShoppingLists((lists) => lists.filter((list) => list.id !== listId))
  }

  return (
    <ShoppingListsContext.Provider
      value={{
        shoppingLists,
        onFetchLists,
        onCreateList,
        onDeleteList,
      }}
    >
      {children}
    </ShoppingListsContext.Provider>
  )
}
