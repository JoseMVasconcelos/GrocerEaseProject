import styles from './SignUp.module.css'

export function SignUp() {
  return (
    <section className={styles.pageContainer}>
      <h1>Realize o seu cadastro!</h1>
      <form className={styles.formContainer}>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Nome completo" />
        <input type="password" placeholder="Senha" />
        <button>Cadastrar-se</button>
      </form>
    </section>
  )
}
