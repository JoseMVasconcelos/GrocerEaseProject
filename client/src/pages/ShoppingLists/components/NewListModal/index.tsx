import styles from './NewListModal.module.css'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Dialog from '@radix-ui/react-dialog'
import { getFormErrors } from '../../../../utils/getFormErrors'

import { CustomInput } from '../../../../components/CustomInput'
import { CustomButton } from '../../../../components/CustomButton'
import { WarningCircle, X } from '@phosphor-icons/react'

const newListFormSchema = zod.object({
  name: zod.string().min(1, 'Informe um nome para a nova lista'),
  description: zod.string().min(1, 'Informe uma descrição'),
})

type NewListFormSchema = zod.infer<typeof newListFormSchema>

export function NewListModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewListFormSchema>({
    resolver: zodResolver(newListFormSchema),
  })

  function handleCreateNewList(newListData: NewListFormSchema) {
    console.log(newListData)
  }

  const errorMessages = getFormErrors<NewListFormSchema>(errors)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CustomButton fullWidth={false}>criar nova lista</CustomButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay}>
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title className={styles.dialogTitle}>
              Crie uma nova lista de compras
            </Dialog.Title>
            <Dialog.Close className={styles.closeButton}>
              <X size={24} />
            </Dialog.Close>
            <Dialog.Description className={styles.dialogDescription}>
              Adicione um nome e descrição para criar a sua nova lista.
            </Dialog.Description>
            {!!errorMessages && (
              <div>
                {errorMessages.map((error) => {
                  return (
                    <div className={styles.error} key={error}>
                      <WarningCircle />
                      <h3>{error}</h3>
                    </div>
                  )
                })}
              </div>
            )}
            <form onSubmit={handleSubmit(handleCreateNewList)}>
              <CustomInput
                inputType="text"
                placeholder="Nome"
                isRequired={false}
                {...register('name')}
              />
              <CustomInput
                inputType="text"
                placeholder="Descrição"
                isRequired={false}
                {...register('description')}
              />
              <CustomButton fullWidth>criar lista</CustomButton>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
