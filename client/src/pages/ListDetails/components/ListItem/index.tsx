import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from '@phosphor-icons/react'
import styles from './ListItem.module.css'
import { useState } from 'react'
import { toggleProductState } from '../../../../services/listProducts'

interface ListItemProps {
  id: string
  name: string
  isChecked: boolean | 'indeterminate'
}

export function ListItem({ id, name, isChecked }: ListItemProps) {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(isChecked)

  async function handleToggleProduct(checked: boolean | 'indeterminate') {
    setChecked(checked)
    await toggleProductState(id, checked)
  }

  return (
    <form className={styles.form}>
      <Checkbox.Root
        className={styles.checkboxRoot}
        id={id}
        checked={checked}
        onCheckedChange={handleToggleProduct}
      >
        <Checkbox.Indicator>
          {checked && <Check size={14} />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id}>{name}</label>
    </form>
  )
}
