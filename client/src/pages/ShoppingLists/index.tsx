import styles from './ShoppingLists.module.css'
import { mockLists } from './mockLists'

import { ListCard } from './components/ListCard'
import { NewListModal } from './components/NewListModal'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext'

export function ShoppingLists() {
  const { isAuthenticated, isLoading, userData } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return <></>
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <div className={styles.pageContainer}>
      <h1>Seja bem-vindo de volta, {userData.name}</h1>
      <div>
        <p>As suas listas de compras:</p>
        <NewListModal />
      </div>
      <section className={styles.listsGrid}>
        {mockLists.map((list) => {
          return (
            <ListCard
              key={list.id}
              title={list.title}
              description={list.description}
              createdAt={list.createdAt}
            />
          )
        })}
      </section>
    </div>
  )
}
