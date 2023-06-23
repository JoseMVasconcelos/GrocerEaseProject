import styles from './SignUp.module.css'

import { getFormErrors } from '../../utils/getFormErrors'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'

import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

const signUpFormSchema = zod.object({
  email: zod.string().email('Informe um email válido'),
  name: zod
    .string()
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/, 'Informe um nome válido'),
  password: zod.string().min(6, 'Informe uma senha com no mínimo 6 caracteres'),
})

type SignUpFormSchema = zod.infer<typeof signUpFormSchema>

export function SignUp() {
  const { handleSignUp } = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function onSignUp(signUpData: SignUpFormSchema) {
    await handleSignUp(signUpData)
  }

  const errorMessages = getFormErrors<SignUpFormSchema>(errors)

  return (
    <section className={styles.pageContainer}>
      <h1>Realize o seu cadastro!</h1>
      {!!errorMessages && (
        <div>
          {errorMessages.map((error) => {
            return (
              <div className={styles.error} key={error}>
                <WarningCircle />
                <h2>{error}</h2>
              </div>
            )
          })}
        </div>
      )}
      <form className={styles.formContainer} onSubmit={handleSubmit(onSignUp)}>
        <CustomInput
          isRequired
          inputType="email"
          placeholder="Email"
          {...register('email')}
        />
        <CustomInput
          isRequired
          inputType="text"
          placeholder="Nome completo"
          {...register('name')}
        />
        <CustomInput
          isRequired
          inputType="password"
          placeholder="Senha"
          {...register('password')}
        />
        <CustomButton fullWidth>Cadastrar-se</CustomButton>
      </form>
    </section>
  )
}
