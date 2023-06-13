import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { CustomButton } from '../../components/CustomButton'

export function Home() {
  return (
    <section className={styles.pageContainer}>
      <h1>Seja bem vindo ao GrocerEase!</h1>
      <div>
        <p>Nunca foi tão fácil fazer a sua lista de compras!</p>
        <p>Faça o seu login ou cadastre-se para começar.</p>
      </div>
      <div className={styles.buttons}>
        <CustomButton fullWidth>
          <Link to={'sign-up'}>Cadastro</Link>
        </CustomButton>
        <CustomButton fullWidth>
          <Link to={'sign-in'}>Login</Link>
        </CustomButton>
      </div>
    </section>
  )
}
