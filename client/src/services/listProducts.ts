import { api } from '../lib/axios'

interface RawProduct {
  name: string
  isChecked: boolean
  _id: string
}

export interface ListProduct {
  name: string
  isChecked: boolean
  id: string
}

interface FetchProductsResponse {
  data: RawProduct[]
}

interface CreateProductResponse {
  data: RawProduct
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

export async function fetchProducts(listId: string): Promise<ListProduct[]> {
  const {
    data: { data: products },
  } = await api.get<FetchProductsResponse>(`/shoppingLists/${listId}/product`)
  return mapProductsData(products)
}

export async function createProduct(
  listId: string,
  productName: string,
): Promise<ListProduct> {
  const {
    data: {
      data: { isChecked, name, _id: id },
    },
  } = await api.post<CreateProductResponse>(
    `/shoppingLists/${listId}/product`,
    {
      productName,
    },
  )

  return {
    name,
    isChecked,
    id,
  }
}

export async function toggleProductState(
  productId: string,
  isChecked: boolean | 'indeterminate',
): Promise<void> {
  await api.patch(`/shoppingLists/product/${productId}`, {
    isChecked,
  })
}
