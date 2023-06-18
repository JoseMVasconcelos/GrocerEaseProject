import styles from './Header.module.css'
import logo from './../../assets/logo.png'
import { UserPopover } from '../UserPopover'
import { Link } from 'react-router-dom'

interface HeaderProps {
  isLoggedIn: boolean
}

export function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div
        className={
          isLoggedIn
            ? styles.contentContainer
            : `${styles.contentContainer} ${styles.userPopoverHidden}`
        }
      >
        <Link to={isLoggedIn ? '/shopping-lists' : '/'} className={styles.logo}>
          <img src={logo} alt="" />
        </Link>
        {isLoggedIn && <UserPopover />}
      </div>
    </header>
  )
}
