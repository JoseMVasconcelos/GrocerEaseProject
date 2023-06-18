import * as Popover from '@radix-ui/react-popover'
import styles from './UserPopover.module.css'
import { User, X } from '@phosphor-icons/react'

export function UserPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.triggerButton}>
          <User size={24} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.popoverContent}>
          <button className={styles.popoverButton}>Editar dados</button>
          <button className={styles.popoverButton}>Sair</button>
          <Popover.Close className={styles.closeButton}>
            <X size={16} />
          </Popover.Close>
          <Popover.Arrow className={styles.popoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
