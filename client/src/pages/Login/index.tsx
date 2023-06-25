import styles from './../SignUp/SignUp.module.css'

import { getFormErrors } from '../../utils/getFormErrors'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const loginFormSchema = zod.object({
  email: zod.string().email('Informe um email válido'),
  password: zod.string().min(1, 'Informe a sua senha'),
})

type LoginFormSchema = zod.infer<typeof loginFormSchema>

export function Login() {
  const { handleLogin, isAuthenticated } = useAuthContext()
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
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })
  const errorMessages = getFormErrors<LoginFormSchema>(errors)

  async function onLogin(loginData: LoginFormSchema) {
    try {
      await handleLogin(loginData)
      reset()
    } catch (error: any) {
      setAuthError(
        error.response?.data?.message ||
          'Ocorreu um erro ao acessar o servidor',
      )
    }
  }

  if (isAuthenticated) {
    return <></>
  }

  return (
    <section className={styles.pageContainer}>
      <h1>Faça o seu login!</h1>
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
      <form className={styles.formContainer} onSubmit={handleSubmit(onLogin)}>
        <CustomInput
          inputType="email"
          placeholder="Email"
          isRequired
          {...register('email')}
        />
        <CustomInput
          inputType="password"
          placeholder="Senha"
          isRequired
          {...register('password')}
        />
        <CustomButton fullWidth>Fazer Login</CustomButton>
      </form>
    </section>
  )
}
