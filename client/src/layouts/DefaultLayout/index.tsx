import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import styles from './DefaultLayout.module.css'

export function DefaultLayout() {
  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <Outlet />
      </main>
    </>
  )
}
