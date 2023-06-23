import styles from './ShoppingLists.module.css'

import { ListCard } from './components/ListCard'
import { NewListModal } from './components/NewListModal'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useShoppingListsContext } from '../../hooks/useShoppingListsContext'

export function ShoppingLists() {
  const { isAuthenticated, isLoading, userData } = useAuthContext()
  const { fetchLists, shoppingLists } = useShoppingListsContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    fetchLists()
  }, [fetchLists])

  if (!isAuthenticated) {
    return <></>
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  console.log(shoppingLists)

  return (
    <div className={styles.pageContainer}>
      <h1>Seja bem-vindo de volta, {userData.name}</h1>
      <div>
        <p>As suas listas de compras:</p>
        <NewListModal />
      </div>
      <section className={styles.listsGrid}>
        {shoppingLists.map((list) => {
          return (
            <ListCard
              key={list.id}
              id={list.id}
              title={list.name}
              description={list.description}
              createdAt={'há 5 dias'}
            />
          )
        })}
      </section>
    </div>
  )
}
