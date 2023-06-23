import styles from './ListCard.module.css'
import { Trash } from '@phosphor-icons/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useShoppingListsContext } from '../../../../hooks/useShoppingListsContext'

interface ListCardProps {
  title: string
  description: string
  createdAt: string
  id: string
}

export function ListCard({ title, description, createdAt, id }: ListCardProps) {
  const { deleteList } = useShoppingListsContext()
  const navigate = useNavigate()

  function handleListClick() {
    navigate(`/shopping-lists/${id}`)
  }

  async function handleTrashButtonClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    await deleteList(id)
    e.stopPropagation()
  }

  return (
    <article className={styles.listCard} onClick={handleListClick}>
      <header>
        <h3>{title}</h3>
        <span>{createdAt}</span>
      </header>
      <div>
        <p>{description}</p>
        <div className={styles.iconContainer} onClick={handleTrashButtonClick}>
          <Trash size={22} />
        </div>
      </div>
    </article>
  )
}
