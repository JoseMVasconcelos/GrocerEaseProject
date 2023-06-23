import styles from './../SignUp/SignUp.module.css'

import { getFormErrors } from '../../utils/getFormErrors'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { WarningCircle } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

const loginFormSchema = zod.object({
  email: zod.string().email('Informe um email válido'),
  password: zod.string().min(1, 'Informe a sua senha'),
})

type LoginFormSchema = zod.infer<typeof loginFormSchema>

export function Login() {
  const { handleLogin } = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })
  const errorMessages = getFormErrors<LoginFormSchema>(errors)

  async function onLogin(loginData: LoginFormSchema) {
    await handleLogin(loginData)
  }

  return (
    <section className={styles.pageContainer}>
      <h1>Faça o seu login!</h1>
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
