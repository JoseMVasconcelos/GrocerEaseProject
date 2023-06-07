import styles from './ShoppingLists.module.css'
import { mockLists } from './mockLists'

import { ListCard } from './components/ListCard'

export function ShoppingLists() {
  return (
    <div className={styles.pageContainer}>
      <h1>Seja bem-vindo de volta, Bernardo De Marco Gonçalves!</h1>
      <div>
        <p>As suas listas de compras:</p>
        <button>criar nova lista</button>
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
