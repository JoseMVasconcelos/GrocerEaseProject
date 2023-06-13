import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { ListItem } from './components/ListItem'
import styles from './ListDetails.module.css'

export function ListDetails() {
  return (
    <div className={styles.pageContainer}>
      <h1>Lista de compras angeloni</h1>
      <form>
        <CustomInput
          inputType="text"
          isRequired
          placeholder="Adicione um novo produto"
        />
        <CustomButton fullWidth={false}>Adicionar produto</CustomButton>
      </form>
      <section className={styles.listProducts}>
        <h2>Produtos da Lista</h2>
        <ListItem />
        <ListItem />
      </section>
    </div>
  )
}
