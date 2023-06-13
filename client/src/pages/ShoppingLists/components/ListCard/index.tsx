import styles from './ListCard.module.css'
import { Trash } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

interface ListCardProps {
  title: string
  description: string
  createdAt: string
}

export function ListCard({ title, description, createdAt }: ListCardProps) {
  const navigate = useNavigate()

  function handleListClick() {
    navigate('/shopping-lists/id')
  }

  return (
    <article className={styles.listCard} onClick={handleListClick}>
      <header>
        <h3>{title}</h3>
        <span>{createdAt}</span>
      </header>
      <div>
        <p>{description}</p>
        <div
          className={styles.iconContainer}
          onClick={(e) => {
            console.log('trash icon')
            e.stopPropagation()
          }}
        >
          <Trash size={22} />
        </div>
      </div>
    </article>
  )
}
