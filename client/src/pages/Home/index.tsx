import { Link, useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import { CustomButton } from '../../components/CustomButton'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEffect } from 'react'

export function Home() {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/shoppingLists')
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    return <></>
  }

  return (
    <section className={styles.pageContainer}>
      <h1>Seja bem vindo ao GrocerEase!</h1>
      <div>
        <p>Nunca foi tão fácil fazer a sua lista de compras!</p>
        <p>Faça o seu login ou cadastre-se para começar.</p>
      </div>
      <div className={styles.buttons}>
        <CustomButton fullWidth>
          <Link to={'/sign-up'}>Cadastro</Link>
        </CustomButton>
        <CustomButton fullWidth>
          <Link to={'/login'}>Login</Link>
        </CustomButton>
      </div>
    </section>
  )
}
