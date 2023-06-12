import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import styles from './../SignUp/SignUp.module.css'

export function SignIn() {
  return (
    <section className={styles.pageContainer}>
      <h1>Faça o seu login!</h1>
      <form className={styles.formContainer}>
        <CustomInput inputType="email" placeholder="Email" isRequired />
        <CustomInput inputType="password" placeholder="Senha" isRequired />
        <CustomButton fullWidth>Fazer Login</CustomButton>
      </form>
    </section>
  )
}
