import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export function Home() {
  return (
    <section className={styles.pageContainer}>
      <h1>Seja bem vindo ao GrocerEase!</h1>
      <div>
        <p>Nunca foi tão fácil fazer a sua lista de compras!</p>
        <p>Faça o seu login ou cadastre-se para começar.</p>
      </div>
      <div className={styles.buttons}>
        <Link to={'sign-up'}>Cadastro</Link>
        <Link to={'sign-in'}>Login</Link>
      </div>
    </section>
  )
}
