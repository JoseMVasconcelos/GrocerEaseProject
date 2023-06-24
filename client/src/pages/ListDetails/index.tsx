import styles from './ListDetails.module.css'

import { getFormErrors } from '../../utils/getFormErrors'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ListItem } from './components/ListItem'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext'
import {
  ListProduct,
  createProduct,
  getListProducts,
} from '../../api/shoppingLists'

const newProductFormSchema = zod.object({
  productName: zod.string().min(1, 'Informe o nome do novo produto'),
})

type NewProductFormSchema = zod.infer<typeof newProductFormSchema>

export function ListDetails() {
  const [products, setProducts] = useState<ListProduct[]>([])
  console.log(products)

  const { id: listId } = useParams()

  // componente montou -> undefined 1x o useEffect
  // pega o id da url -> seta o id 1x o useEffect

  useEffect(() => {
    async function getData() {
      const products = await getListProducts(listId as string)
      setProducts(products)
    }

    if (typeof listId !== 'undefined') {
      getData()
    }
  }, [listId])

  const { isAuthenticated, isLoading } = useAuthContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
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
    const product = await createProduct(
      listId as string,
      newProductData.productName,
    )
    setProducts((prevProducts) => [...prevProducts, product])
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
      <h1>Lista de compras angeloni</h1>
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
        <h2>Produtos da Lista</h2>
        {products.map((product) => {
          return (
            <ListItem
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
