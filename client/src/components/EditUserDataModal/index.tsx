import styles from './EditUserDataModal.module.css'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Dialog from '@radix-ui/react-dialog'
import { getFormErrors } from '../../utils/getFormErrors'

import { CustomButton } from '../CustomButton'
import { CustomInput } from '../CustomInput'
import { WarningCircle, X } from '@phosphor-icons/react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'

const editUserDataFormSchema = zod.object({
  email: zod.string().email('Informe um email válido'),
  name: zod
    .string()
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/, 'Informe um nome válido'),
  password: zod.string().min(6, 'Informe uma senha com no mínimo 6 caracteres'),
})

type EditUserDataFormSchema = zod.infer<typeof editUserDataFormSchema>

interface EditUserDataModalProps {
  closeModal: () => void
}

export function EditUserDataModal({ closeModal }: EditUserDataModalProps) {
  const [authError, setAuthError] = useState('')
  const { handleEditUserData } = useAuthContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserDataFormSchema>({
    resolver: zodResolver(editUserDataFormSchema),
  })

  async function onEditUserData(newUserData: EditUserDataFormSchema) {
    try {
      await handleEditUserData(newUserData)
      reset()
      closeModal()
    } catch (error: any) {
      setAuthError(
        error.response?.data?.message ||
          'Ocorreu um erro ao acessar o servidor',
      )
    }
  }

  const errorMessages = getFormErrors<EditUserDataFormSchema>(errors)

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>
            Edite seus dados
          </Dialog.Title>
          <Dialog.Close className={styles.closeButton}>
            <X size={24} />
          </Dialog.Close>
          {authError.length > 0 && (
            <div className={styles.error}>
              <WarningCircle />
              <h2>{authError}</h2>
            </div>
          )}
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
          <form onSubmit={handleSubmit(onEditUserData)}>
            <CustomInput
              inputType="email"
              placeholder="Email"
              isRequired
              {...register('email')}
            />
            <CustomInput
              inputType="text"
              placeholder="Nome completo"
              isRequired
              {...register('name')}
            />
            <CustomInput
              inputType="password"
              placeholder="Senha"
              isRequired
              {...register('password')}
            />
            <CustomButton fullWidth>Salvar alterações</CustomButton>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
