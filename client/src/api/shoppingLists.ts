import { api } from '../lib/axios'

interface CreateListResponse {
  data: {
    name: string
    description: string
    _id: string
  }
}

export interface NewList {
  name: string
  description: string
}

interface RawProduct {
  name: string
  isChecked: boolean
  _id: string
}

interface ListRawData {
  name: string
  description: string
  _id: string
  products: RawProduct[]
}

interface ListProduct {
  name: string
  isChecked: boolean
  id: string
}

export interface ShoppingList {
  id: string
  name: string
  description: string
  products: ListProduct[]
}

function mapProductsData(rawProducts: RawProduct[]): ListProduct[] {
  return rawProducts.map((product) => {
    const { name, isChecked, _id: id } = product
    return {
      name,
      isChecked,
      id,
    }
  })
}

function mapListsData(rawLists: ListRawData[]): ShoppingList[] {
  return rawLists.map((list) => {
    const { name, description, _id: id, products: rawProducts } = list
    const products = mapProductsData(rawProducts)
    return {
      name,
      description,
      id,
      products,
    }
  })
}

export async function fetchLists() {
  const { data: rawLists } = await api.get<ListRawData[]>('/shoppingLists')
  return mapListsData(rawLists)
}

export async function createList(newList: NewList) {
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
