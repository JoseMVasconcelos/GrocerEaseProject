import { api } from '../lib/axios'

export interface NewList {
  name: string
  description: string
}

interface ListRawData {
  name: string
  description: string
  _id: string
}

export interface ShoppingList {
  id: string
  name: string
  description: string
}

interface CreateListResponse {
  data: ListRawData
}

function mapListsData(rawLists: ListRawData[]): ShoppingList[] {
  return rawLists.map((list) => {
    const { name, description, _id: id } = list
    return {
      name,
      description,
      id,
    }
  })
}

export async function fetchLists(): Promise<ShoppingList[]> {
  const { data: rawLists } = await api.get<ListRawData[]>('/shoppingLists')
  return mapListsData(rawLists)
}

export async function createList(newList: NewList): Promise<ShoppingList> {
  const {
    data: {
      data: { description, name, _id: id },
    },
  } = await api.post<CreateListResponse>('/shoppingLists', newList)
  return { name, description, id }
}

export async function deleteList(listId: string): Promise<void> {
  await api.delete(`/shoppingLists/${listId}`)
}
