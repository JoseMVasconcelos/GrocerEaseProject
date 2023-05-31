import styles from './Home.module.css'

export function Home() {
  return (
    <section className={styles.pageContainer}>
      <div>
        <h1>Seja bem vindo ao GrocerEase</h1>
      </div>
      <div>
        <p>Nunca foi tão fácil fazer a sua lista de compras!</p>
        <p>Faça o seu login ou cadastre-se para começar!</p>
      </div>
    </section>
  )
}
