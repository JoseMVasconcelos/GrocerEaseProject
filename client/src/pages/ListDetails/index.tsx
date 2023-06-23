import styles from './ListDetails.module.css'

import { getFormErrors } from '../../utils/getFormErrors'
import { mockListItems } from './mockListItems'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ListItem } from './components/ListItem'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { useNavigate } from 'react-router'

const newProductFormSchema = zod.object({
  productName: zod.string().min(1, 'Informe o nome do novo produto'),
})

type NewProductFormSchema = zod.infer<typeof newProductFormSchema>

export function ListDetails() {
  const { isAuthenticated, isLoading } = useContext(AuthContext)
  const navigate = useNavigate()
  // const { id } = useParams()

  // const listData =

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
    console.log(newProductData)
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
        {mockListItems.map((listItem) => {
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
