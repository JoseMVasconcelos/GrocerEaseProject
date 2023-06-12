import { X } from '@phosphor-icons/react'
import styles from './NewListModal.module.css'
import * as Dialog from '@radix-ui/react-dialog'

export function NewListModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles.button}>criar nova lista</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>
            Crie uma nova lista de compras
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className={styles.closeButton}>
              <X size={24} />
            </button>
          </Dialog.Close>
          <form>
            <input type="text" placeholder="Nova lista" />
            <button>criar lista</button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
