import logo from './../../assets/logo.png'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <h2>GrocerEase</h2>
      <img src={logo} alt="" />
    </header>
  )
}
