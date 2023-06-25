# Documentação Frontend

Esse documento contem uma breve documentação do Frontend desenvolvido.

## 🚀 Setup

Para rodar o **frontend** vá para a pasta client e execute os seguintes comandos:

```bash
    # instala as dependências
    npm i

    # roda localmente em http://localhost:5173/
    npm run dev
```

## Construído com

- **_React.js_**
- **_TypeScript_**
- **_Vite_**
- **_React Router Dom_**
- **_React Hook Form_**

## Arquitetura do projeto

### Pasta components

Dentro da pasta components estão todos os componentes da aplicação que são compartilhados por _**mais de uma**_ página.

### Pasta pages

Páginas da aplicação. Dentro de algumas páginas, tem uma pasta components que contem os componentes que são _**exclusivos**_ para aquela determinada página.

### Pastas contexts, hooks, services e layouts

Contém, respectivamente, os contextos, hooks customizados, funções que realizam a integração com a API e layouts da aplicação.

### Pastas assets, lib, utils e styles

Contém, respectivamente, imagens, arquivos de configuração de bibliotecas externas, funções gerais e estilos globais.
