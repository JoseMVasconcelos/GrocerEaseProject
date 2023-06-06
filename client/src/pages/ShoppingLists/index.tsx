import { Link } from 'react-router-dom'
import styles from './ShoppingLists.module.css'
import { ListCard } from './components/ListCard'

export function ShoppingLists() {
  return (
    <div className={styles.pageContainer}>
      <h1>Seja bem-vindo de volta Bernardo De Marco Gonçalves!</h1>
      <div>
        <p>As suas listas de compras:</p>
        <Link to={''}>criar nova lista</Link>
      </div>
      <ListCard
        createdAt="Há 5 dias"
        title="Lista quinta do Angeloni"
        description="Lista do rancho de quinta que foi feito no Angeloni Lista do rancho de quinta que foi feito no Angeloni Lista do rancho de quinta que foi feito no Angeloni Lista do rancho de quinta que foi feito no Angeloni Lista do rancho de quinta que foi feito no Angeloni Lista do rancho de quinta que foi feito no Angeloni o Angeloni Lista do rancho de quinta que foi feito no Angeloni Lista do rancho de quinta que foi feito no Angeloni Lista do rancho de quinta que foi feito no An"
      />
    </div>
  )
}
