import styles from './EditUserDataModal.module.css'
import * as Dialog from '@radix-ui/react-dialog'
import { WarningCircle, X } from '@phosphor-icons/react'
import { CustomButton } from '../CustomButton'
import { CustomInput } from '../CustomInput'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getFormErrors } from '../../utils/getFormErrors'

const editUserDataFormSchema = zod.object({
  email: zod.string().email('Informe um email válido'),
  name: zod
    .string()
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/, 'Informe um nome válido'),
  password: zod.string().min(6, 'Informe uma senha com no mínimo 6 caracteres'),
})

type EditUserDataFormSchema = zod.infer<typeof editUserDataFormSchema>

export function EditUserDataModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserDataFormSchema>({
    resolver: zodResolver(editUserDataFormSchema),
  })

  function handleEditarUserData(newUserData: EditUserDataFormSchema) {
    console.log(newUserData)
  }

  const errorMessages = getFormErrors(errors)

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
          <form onSubmit={handleSubmit(handleEditarUserData)}>
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
