import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from '@phosphor-icons/react'
import styles from './ListItem.module.css'

interface ListItemProps {
  id: string
  name: string
  isChecked: boolean
}

export function ListItem({ id, name }: ListItemProps) {
  return (
    <form className={styles.form}>
      <Checkbox.Root className={styles.checkboxRoot} id={id}>
        <Checkbox.Indicator>
          <Check size={14} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id.toString()}>{name}</label>
    </form>
  )
}
