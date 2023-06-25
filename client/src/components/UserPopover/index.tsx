import * as Popover from '@radix-ui/react-popover'
import * as Dialog from '@radix-ui/react-dialog'
import styles from './UserPopover.module.css'
import { User, X } from '@phosphor-icons/react'
import { EditUserDataModal } from '../EditUserDataModal'
import { LogoutModal } from '../LogoutModal'
import { useState } from 'react'

export function UserPopover() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.triggerButton}>
          <User size={24} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.popoverContent}>
          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Trigger asChild>
              <button className={styles.popoverButton}>Editar dados</button>
            </Dialog.Trigger>
            <EditUserDataModal closeModal={closeModal} />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className={styles.popoverButton}>Sair</button>
            </Dialog.Trigger>
            <LogoutModal />
          </Dialog.Root>
          <Popover.Close className={styles.closeButton}>
            <X size={16} />
          </Popover.Close>
          <Popover.Arrow className={styles.popoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
