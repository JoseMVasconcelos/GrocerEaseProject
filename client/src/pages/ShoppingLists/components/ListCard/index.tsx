import styles from './ListCard.module.css'

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
      <p>{description}</p>
    </article>
  )
}
