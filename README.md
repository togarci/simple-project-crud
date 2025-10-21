# Simple Project CRUD

Uma aplicação web simples para Gerenciamento de Projetos (CRUD - Create, Read, Update, Delete) construída com Nuxt 3 e Vue 3. Permite criar, listar, editar e remover projetos, além de funcionalidades como upload de imagem, lista de favoritos e ordenação.

O estado da aplicação é gerenciado pelo Pinia e persistido no `localStorage` do navegador, o que significa que seus projetos não desaparecerão ao recarregar a página.

!Demonstração do Projeto

<p align="center">
<b>
 <a href="https://simple-project-crud.vercel.app/"><strong>Ver Online 🚀</strong></a>
</b>
 
</p>

## ✨ Funcionalidades

- **CRUD de Projetos**: Crie, leia, atualize e delete projetos.
- **Upload de Imagem**: Adicione uma imagem de capa para cada projeto com preview instantâneo.
- **Persistência de Dados**: Os dados são salvos localmente no navegador e persistem entre sessões.
- **Lista de Desejos (Wishlist)**: Marque seus projetos favoritos para filtrá-los facilmente.
- **Ordenação Dinâmica**: Organize a lista de projetos por ordem alfabética, data de início ou prazo final.
- **Design Responsivo**: Interface adaptável para desktops, tablets e celulares.
- **Notificações**: Feedback visual para o usuário ao realizar ações (sucesso ou erro).
- **Testes Unitários**: Componentes testados com Vitest para garantir a qualidade e estabilidade.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- **Framework**: Nuxt 3
- **UI Library**: Vue 3 (Composition API)
- **Linguagem**: TypeScript
- **State Management**: Pinia
- **Persistência de Estado**: `pinia-plugin-persistedstate`
- **Estilização**: Tailwind CSS
- **Testes**: Vitest com `@nuxt/test-utils`
- **Notificações**: Vue3-Toastify

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 22.x ou superior)
- Yarn ou NPM

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/simple-project-crud.git
cd simple-project-crud
```

### 2. Instale as Dependências

Usando npm:

```bash
npm install
```

Ou usando yarn:

```bash
yarn install
```

### 3. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Após a execução, a aplicação estará disponível em `http://localhost:3000`.

## 🧪 Rodando os Testes

Para executar a suíte de testes unitários, utilize o seguinte comando:

```bash
npm run test
```

## 📂 Estrutura do Projeto

O projeto segue a estrutura de diretórios padrão do Nuxt 3:

- `app/components/`: Componentes Vue reutilizáveis.
- `app/layouts/`: Layouts da aplicação.
- `app/pages/`: As páginas e rotas da aplicação.
- `app/store/`: As stores do Pinia para gerenciamento de estado.
- `app/plugins/`: Plugins do Nuxt.
