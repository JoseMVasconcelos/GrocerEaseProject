import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { ListItem } from './components/ListItem'
import styles from './ListDetails.module.css'
import { mockListItems } from './mockListItems'

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
        {mockListItems.map((listItem) => {
          return (
            <ListItem
              key={listItem.id}
              id={listItem.id}
              name={listItem.name}
              isChecked={listItem.isChecked}
            />
          )
        })}
      </section>
    </div>
  )
}
