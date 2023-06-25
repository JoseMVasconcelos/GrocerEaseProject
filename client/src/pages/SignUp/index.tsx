import styles from './SignUp.module.css'

import { getFormErrors } from '../../utils/getFormErrors'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'

import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const signUpFormSchema = zod.object({
  email: zod.string().email('Informe um email válido'),
  name: zod
    .string()
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/, 'Informe um nome válido'),
  password: zod.string().min(6, 'Informe uma senha com no mínimo 6 caracteres'),
})

type SignUpFormSchema = zod.infer<typeof signUpFormSchema>

export function SignUp() {
  const { handleSignUp, isAuthenticated } = useAuthContext()
  const [authError, setAuthError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/shopping-lists')
    }
  }, [isAuthenticated, navigate])

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function onSignUp(signUpData: SignUpFormSchema) {
    try {
      await handleSignUp(signUpData)
      reset()
    } catch (error: any) {
      setAuthError(
        error.response?.data?.message ||
          'Ocorreu um erro ao acessar o servidor',
      )
    }
  }

  const errorMessages = getFormErrors<SignUpFormSchema>(errors)

  if (isAuthenticated) {
    return <></>
  }

  return (
    <section className={styles.pageContainer}>
      <h1>Realize o seu cadastro!</h1>
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
