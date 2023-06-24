import styles from './ListCard.module.css'

import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useShoppingListsContext } from '../../../../hooks/useShoppingListsContext'

import { ShareNetwork, Trash } from '@phosphor-icons/react'

interface ListCardProps {
  title: string
  description: string
  id: string
}

export function ListCard({ title, description, id }: ListCardProps) {
  const { onDeleteList } = useShoppingListsContext()
  const navigate = useNavigate()

  function handleListClick() {
    navigate(`/shopping-lists/${id}`)
  }

  async function handleTrashButtonClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    e.stopPropagation()
    await onDeleteList(id)
  }

  return (
    <article className={styles.listCard} onClick={handleListClick}>
      <header>
        <h3>{title}</h3>
        <ShareNetwork />
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
