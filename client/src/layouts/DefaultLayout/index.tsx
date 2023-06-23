import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import styles from './DefaultLayout.module.css'
// import { useAuthContext } from '../../hooks/useAuthContext'

export function DefaultLayout() {
  // const { apiError } = useAuthContext()
  return (
    <>
      <Header />
      {/* {apiError && (
        <article className={styles.errorCard}>
          <h3>{apiError}</h3>
        </article>
      )} */}
      <main className={styles.pageContainer}>
        <Outlet />
      </main>
    </>
  )
}
