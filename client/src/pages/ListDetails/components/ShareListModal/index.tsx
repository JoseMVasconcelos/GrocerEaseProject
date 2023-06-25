import modalStyles from './../../../ShoppingLists/components/NewListModal/NewListModal.module.css'
import styles from './ShareListModal.module.css'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Dialog from '@radix-ui/react-dialog'
import { getFormErrors } from '../../../../utils/getFormErrors'

import { CustomInput } from '../../../../components/CustomInput'
import { CustomButton } from '../../../../components/CustomButton'
import { ShareNetwork, WarningCircle, X } from '@phosphor-icons/react'
import { shareList } from '../../../../services/shoppingLists'

const shareListFormSchema = zod.object({
  email: zod.string().email('Informe um email válido'),
})

type ShareListFormSchema = zod.infer<typeof shareListFormSchema>

interface ShareListModalProps {
  listId: string | undefined
}

export function ShareListModal({ listId }: ShareListModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShareListFormSchema>({
    resolver: zodResolver(shareListFormSchema),
  })

  async function handleShareList(shareListFormData: ShareListFormSchema) {
    if (listId) {
      await shareList(listId, shareListFormData.email)
    }
  }

  const errorMessages = getFormErrors<ShareListFormSchema>(errors)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className={styles.triggerButton}>
          <ShareNetwork size={14} />
          <span>compartilhar lista</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={modalStyles.dialogOverlay}>
          <Dialog.Content className={modalStyles.dialogContent}>
            <Dialog.Title className={modalStyles.dialogTitle}>
              Compartilhar
            </Dialog.Title>
            <Dialog.Close className={modalStyles.closeButton}>
              <X size={24} />
            </Dialog.Close>
            <Dialog.Description className={modalStyles.dialogDescription}>
              Insira o email da pessoa com quem você deseja compartilhar
            </Dialog.Description>
            {!!errorMessages && (
              <div>
                {errorMessages.map((error) => {
                  return (
                    <div className={modalStyles.error} key={error}>
                      <WarningCircle />
                      <h3>{error}</h3>
                    </div>
                  )
                })}
              </div>
            )}
            <form onSubmit={handleSubmit(handleShareList)}>
              <CustomInput
                inputType="email"
                placeholder="Email"
                isRequired={false}
                {...register('email')}
              />
              <CustomButton fullWidth>compartilhar lista</CustomButton>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
