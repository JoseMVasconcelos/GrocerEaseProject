import styles from './Header.module.css'
import logo from './../../assets/logo.png'
import { EditUserDataModal } from '../EditUserDataModal'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
      </div>
      <EditUserDataModal />
    </header>
  )
}
