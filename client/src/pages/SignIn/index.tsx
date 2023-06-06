import styles from './../SignUp/SignUp.module.css'

export function SignIn() {
  return (
    <section className={styles.pageContainer}>
      <h1>Faça o seu login!</h1>
      <form className={styles.formContainer}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button>Fazer Login</button>
      </form>
    </section>
  )
}
