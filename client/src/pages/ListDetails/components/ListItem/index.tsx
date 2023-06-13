import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from '@phosphor-icons/react'
import styles from './ListItem.module.css'

export function ListItem() {
  return (
    <form className={styles.form}>
      <Checkbox.Root className={styles.checkboxRoot} id="1">
        <Checkbox.Indicator>
          <Check size={14} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor="1">Mamão papaia</label>
    </form>
  )
}
