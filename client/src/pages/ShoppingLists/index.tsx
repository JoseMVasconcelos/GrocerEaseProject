import styles from './ShoppingLists.module.css'

import { ListCard } from './components/ListCard'
import { NewListModal } from './components/NewListModal'

import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useShoppingListsContext } from '../../hooks/useShoppingListsContext'

export function ShoppingLists() {
  const { isAuthenticated, isLoading, userData } = useAuthContext()
  const { shoppingLists, onFetchLists } = useShoppingListsContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    async function fetchLists() {
      await onFetchLists()
    }

    fetchLists()
  }, [onFetchLists])

  if (!isAuthenticated) {
    return <></>
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <div className={styles.pageContainer}>
      <h1>Seja bem-vindo (a), {userData.name}!</h1>
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
            />
          )
        })}
      </section>
    </div>
  )
}
