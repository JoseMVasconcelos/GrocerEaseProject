import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import styles from './../SignUp/SignUp.module.css'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../lib/axios'

const loginFormSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1, 'Informe a sua senha'),
})

type LoginFormSchema = zod.infer<typeof loginFormSchema>

export function SignIn() {
  const { handleSubmit, register } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(loginData: LoginFormSchema) {
    const res = await api.post('/login', loginData)
    console.log(res)
  }

  return (
    <section className={styles.pageContainer}>
      <h1>Faça o seu login!</h1>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(handleLogin)}
      >
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
