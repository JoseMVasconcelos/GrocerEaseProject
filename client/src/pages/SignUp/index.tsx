import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import styles from './SignUp.module.css'

export function SignUp() {
  return (
    <section className={styles.pageContainer}>
      <h1>Realize o seu cadastro!</h1>
      <form className={styles.formContainer}>
        <CustomInput isRequired inputType="email" placeholder="Email" />
        <CustomInput isRequired inputType="text" placeholder="Nome completo" />
        <CustomInput isRequired inputType="password" placeholder="Senha" />
        <CustomButton fullWidth>Cadastrar-se</CustomButton>
      </form>
    </section>
  )
}
