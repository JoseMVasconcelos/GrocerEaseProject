# Documentação Backend

Esse arquivo contem uma breve documentação do backend desenvolvido.

## 🚀 Setup

Para rodar o **backend** vá para a pasta server e criei um arquivo .env. Adicione nele as chaves que estão exemplificadas no arquivo .env.example.

Em seguida, execute os seguintes comandos:

```bash
    # instala as dependências
    npm i

    # roda localmente em http://localhost:3000/
    npm run dev
```

## Bibliotecas utilizadas e suas funcionalidades

### Backend

- **express**: Framework web rápido, flexível e minimalista para aplicações Node.js.
- **bcryptjs**: Criptografa senhas em aplicações JavaScript no back-end.
- **cors**: Gerencia políticas de compartilhamento de recursos entre domínios em aplicações web.
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo .env.
- **joi**: Validação de dados e definição de esquemas de objetos em JavaScript.
- **jsonwebtoken**: Geração e verificação de tokens de autenticação JSON Web Token (JWT).
- **mongodb**: Driver oficial do MongoDB para Node.js, utilizado para interagir com bancos de dados MongoDB.
- **mongoose**: ODM (Object Data Modeling) para o MongoDB, fornecendo uma camada de abstração para trabalhar com dados do MongoDB no Node.js.
- **nodemon**: Ferramenta que reinicia automaticamente o servidor Node.js ao detectar alterações nos arquivos do projeto.

## Arquitetura do Projeto

### **Backend**

O projeto utiliza uma arquitetura de desenvolvimento dividida em pastas com funcionalidades específicas:

#### Controller

A pasta `Controller` é responsável por tratar as requisições web recebidas pela aplicação. Ela lida com a interação entre o cliente e o servidor, recebendo os dados da requisição e chamando os serviços correspondentes para processá-los. Os controllers são responsáveis por retornar as respostas adequadas para o cliente.

#### Service

A pasta `Service` contém os arquivos responsáveis pela lógica de negócio da aplicação. Ela encapsula a lógica do código, manipulando os dados recebidos dos controllers e interagindo com os modelos (models) e demais componentes necessários. Os serviços são responsáveis por realizar as operações específicas da aplicação, como realizar consultas ao banco de dados, executar cálculos ou processar dados.

#### Models

A pasta `Models` abriga os arquivos relacionados aos Schemas do banco de dados MongoDB. Os modelos definem a estrutura e o comportamento dos dados que serão armazenados no banco de dados. Eles representam as entidades da aplicação e são responsáveis por definir os campos, validações e relacionamentos entre os dados.

#### Validations

A pasta `Validations` contém os esquemas de validação definidos utilizando a biblioteca Joi. Esses esquemas são utilizados para validar e garantir a integridade dos dados recebidos pela aplicação. Eles definem regras de validação, como tipo de dado, formato, tamanho máximo, entre outros, permitindo que os dados sejam verificados antes de serem processados pela lógica do código.
