import { ReactNode, createContext, useState, useCallback } from 'react'

import {
  NewList,
  ShoppingList,
  createList,
  deleteList,
  fetchLists,
} from '../../api/shoppingLists'

interface ShoppingListsContextType {
  onFetchLists: () => Promise<void>
  onCreateList: (newList: NewList) => Promise<void>
  onDeleteList: (listId: string) => Promise<void>
  onAddNewProduct: (listId: string, productName: string) => void
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
    setShoppingLists((lists) => [
      ...lists,
      { name, description, id, products: [] },
    ])
  }

  async function onDeleteList(listId: string) {
    await deleteList(listId)
    setShoppingLists((lists) => lists.filter((list) => list.id !== listId))
  }

  function onAddNewProduct(listId: string, productName: string): void {
    setShoppingLists((lists) => {
      return lists.map((list) => {
        if (list.id !== listId) {
          return list
        }

        return {
          ...list,
          products: [
            ...list.products,
            {
              name: productName,
              isChecked: false,
              id: productName,
            },
          ],
        }
      })
    })
  }

  return (
    <ShoppingListsContext.Provider
      value={{
        shoppingLists,
        onFetchLists,
        onCreateList,
        onDeleteList,
        onAddNewProduct,
      }}
    >
      {children}
    </ShoppingListsContext.Provider>
  )
}
