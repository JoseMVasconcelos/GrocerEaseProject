import styles from './ListCard.module.css'
import { Trash } from '@phosphor-icons/react'

interface ListCardProps {
  title: string
  description: string
  createdAt: string
}

export function ListCard({ title, description, createdAt }: ListCardProps) {
  return (
    <article className={styles.listCard}>
      <header>
        <h3>{title}</h3>
        <span>{createdAt}</span>
      </header>
      <div>
        <p>{description}</p>
        <div className={styles.iconContainer}>
          <Trash size={22} />
        </div>
      </div>
    </article>
  )
}
