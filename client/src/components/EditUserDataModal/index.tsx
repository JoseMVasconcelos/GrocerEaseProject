import * as Dialog from '@radix-ui/react-dialog'
import styles from './EditUserDataModal.module.css'
import { User } from '@phosphor-icons/react'

export function EditUserDataModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles.triggerButton}>
          <User size={24} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content>
            <Dialog.Title></Dialog.Title>
            <Dialog.Close></Dialog.Close>
            <Dialog.Description></Dialog.Description>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
