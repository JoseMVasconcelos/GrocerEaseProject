import { ReactNode, createContext, useCallback, useState } from 'react'
import { api } from '../../lib/axios'

interface ListProduct {
  name: string
  isChecked: string
}

export interface ShoppingList {
  id: string
  name: string
  description: string
  products?: ListProduct[]
}

interface CreateListType {
  name: string
  description: string
}

interface ShoppingListsContextType {
  shoppingLists: ShoppingList[]
  fetchLists: () => Promise<void>
  createList: (newList: CreateListType) => Promise<void>
  deleteList: (listId: string) => Promise<void>
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

  const fetchLists = useCallback(async function () {
    // TODO -> SETTING API RAW DATA IN THE STATE
    // const { data: lists } = await api.get('/shoppingLists')
    // setShoppingLists(() =>
    //   lists.map((list) => {
    //     return {
    //       id: list._id,
    //     }
    //   }),
    // )
  }, [])

  async function createList(newList: CreateListType) {
    const {
      data: {
        data: { description, name, _id: id },
      },
    } = await api.post('/shoppingLists', newList)
    setShoppingLists((lists) => [...lists, { name, description, id }])
  }

  async function deleteList(listId: string) {
    await api.delete(`/shoppingLists/${listId}`)
    setShoppingLists((lists) => lists.filter((list) => list.id !== listId))
  }

  // async function updateListProducts(listId: string) {}

  return (
    <ShoppingListsContext.Provider
      value={{
        shoppingLists,
        fetchLists,
        createList,
        deleteList,
      }}
    >
      {children}
    </ShoppingListsContext.Provider>
  )
}
