import * as Popover from '@radix-ui/react-popover'
import * as Dialog from '@radix-ui/react-dialog'
import styles from './UserPopover.module.css'
import { User, X } from '@phosphor-icons/react'
import { EditUserDataModal } from '../EditUserDataModal'

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
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className={styles.popoverButton}>Editar dados</button>
            </Dialog.Trigger>
            <EditUserDataModal />
          </Dialog.Root>
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
