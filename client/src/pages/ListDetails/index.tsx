import styles from './ListDetails.module.css'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ListProduct } from './components/ListProduct'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useShoppingListsContext } from '../../hooks/useShoppingListsContext'

import {
  ListProductType,
  createProduct,
  fetchProducts,
} from '../../services/listProducts'

import { getFormErrors } from '../../utils/getFormErrors'
import { ShareListModal } from './components/ShareListModal'

const newProductFormSchema = zod.object({
  productName: zod.string().min(1, 'Informe o nome do novo produto'),
})

type NewProductFormSchema = zod.infer<typeof newProductFormSchema>

export function ListDetails() {
  const [products, setProducts] = useState<ListProductType[]>([])
  const { isAuthenticated, isLoading } = useAuthContext()
  const { shoppingLists } = useShoppingListsContext()

  const navigate = useNavigate()
  const { id: listId } = useParams()
  const list = shoppingLists.find((list) => list.id === listId)

  useEffect(() => {
    async function getData() {
      try {
        if (typeof listId !== 'undefined') {
          const products = await fetchProducts(listId)
          setProducts(products)
        }
      } catch {
        navigate('/shopping-lists')
      }
    }

    getData()
  }, [listId, navigate])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProductFormSchema>({
    resolver: zodResolver(newProductFormSchema),
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  async function handleAddNewProduct(newProductData: NewProductFormSchema) {
    if (typeof listId !== 'undefined') {
      const product = await createProduct(listId, newProductData.productName)
      setProducts((prevProducts) => [...prevProducts, product])
    }
    reset()
  }

  const errorMessages = getFormErrors<NewProductFormSchema>(errors)

  if (!isAuthenticated) {
    return <></>
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <div className={styles.pageContainer}>
      <h1>{list?.name}</h1>
      {!!errorMessages && (
        <div>
          {errorMessages.map((error) => {
            return (
              <div className={styles.error} key={error}>
                <WarningCircle />
                <h3>{error}</h3>
              </div>
            )
          })}
        </div>
      )}
      <form onSubmit={handleSubmit(handleAddNewProduct)}>
        <CustomInput
          inputType="text"
          isRequired={false}
          placeholder="Adicione um novo produto"
          {...register('productName')}
        />
        <CustomButton fullWidth={false}>Adicionar produto</CustomButton>
      </form>
      <section className={styles.listProducts}>
        <div>
          <h2>Produtos da Lista</h2>
          <ShareListModal listId={listId} />
        </div>
        {products.map((product) => {
          return (
            <ListProduct
              key={product.id}
              id={product.id}
              name={product.name}
              isChecked={product.isChecked}
            />
          )
        })}
      </section>
    </div>
  )
}
