import styles from './ListDetails.module.css'

import { getFormErrors } from '../../utils/getFormErrors'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ListItem } from './components/ListItem'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useShoppingListsContext } from '../../hooks/useShoppingListsContext'
import { ShoppingList } from '../../api/shoppingLists'

const newProductFormSchema = zod.object({
  productName: zod.string().min(1, 'Informe o nome do novo produto'),
})

type NewProductFormSchema = zod.infer<typeof newProductFormSchema>

export function ListDetails() {
  const { isAuthenticated, isLoading } = useAuthContext()
  const { onAddNewProduct, shoppingLists } = useShoppingListsContext()
  const navigate = useNavigate()

  const { id: listId } = useParams() as { id: string }
  const list = shoppingLists.find((list) => list.id === listId) as ShoppingList

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

  function handleAddNewProduct(newProductData: NewProductFormSchema) {
    onAddNewProduct(listId, newProductData.productName)
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
        {list.products.map((listItem) => {
          return (
            <ListItem
              key={listItem.id}
              id={listItem.id}
              name={listItem.name}
              isChecked={listItem.isChecked}
            />
          )
        })}
      </section>
    </div>
  )
}
