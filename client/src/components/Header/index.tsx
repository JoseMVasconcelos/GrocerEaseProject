import styles from './Header.module.css'
import logo from './../../assets/logo.png'
import { UserPopover } from '../UserPopover'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

export function Header() {
  const { isAuthenticated } = useAuthContext()

  return (
    <header className={styles.header}>
      <div
        className={
          isAuthenticated
            ? styles.contentContainer
            : `${styles.contentContainer} ${styles.userPopoverHidden}`
        }
      >
        <Link
          to={isAuthenticated ? '/shopping-lists' : '/'}
          className={styles.logo}
        >
          <img src={logo} alt="" />
        </Link>
        {isAuthenticated && <UserPopover />}
      </div>
    </header>
  )
}
