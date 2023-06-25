import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from '@phosphor-icons/react'
import styles from './ListProduct.module.css'
import { useState } from 'react'
import { toggleProductState } from '../../../../services/listProducts'

interface ListProductProps {
  id: string
  name: string
  isChecked: boolean | 'indeterminate'
}

export function ListProduct({ id, name, isChecked }: ListProductProps) {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(isChecked)

  async function handleToggleProduct(checked: boolean | 'indeterminate') {
    setChecked(checked)
    await toggleProductState(id, checked)
  }

  return (
    <form
      className={checked ? `${styles.form} ${styles.checked}` : styles.form}
    >
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
