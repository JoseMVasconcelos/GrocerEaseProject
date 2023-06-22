import { zodResolver } from '@hookform/resolvers/zod'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import styles from './SignUp.module.css'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { api } from '../../lib/axios'

const signUpFormSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().min(1, 'Informe o seu nome'),
  password: zod.string().min(1, 'Informe a sua senha'),
})

type SignUpFormSchema = zod.infer<typeof signUpFormSchema>

export function SignUp() {
  const { handleSubmit, register } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleSignUp(signUpData: SignUpFormSchema) {
    const res = await api.post('/signUp', {
      ...signUpData,
      confirm_password: signUpData.password,
    })
    console.log(res)
  }

  return (
    <section className={styles.pageContainer}>
      <h1>Realize o seu cadastro!</h1>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(handleSignUp)}
      >
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
