# COMENTÁRIOS

## Decisão da arquitetura utilizada

Para o desenvolvimento do projeto, optei por dividi-lo em 3 partes: Front-end, Back-end e Banco de Dados.
Com essa divisão, cada parte passa a ter responsabilidades específicas, deixando o projeto mais organizado e de fácil manutenção.

### Frontend: Vue.js + Vuetify

**Vue.js:** É utilizado na construção da interface de usuário do projeto, ele ajuda a criar aplicações
bem estruturadas de forma simples e rápida.

**Vuetify:** É utilizada na estilização da interface de usuário do projeto, ele simplica a estilização das páginas,
permitindo criar interfaces mais bonitas e responsivas.

### Backend: Node.js e Express

**Node.js:** O Node.js é utilizado para interpretar/executar código JavaScript do lado do servidor.

**Express:** O Express é utilizado na criação da API que vai servir como intermediadora entre o Front-end e o Back-end, no gerenciamento de rotas e na manipulação de requisições HTTP.

### Banco de Dados: MySQL

**MySQL:** O MySQL é utilizado para armazenar e gerenciar os dados no Banco de Dados.

## Lista de bibliotecas de terceiros utilizadas

### Front-end

**Vue.js:** Framework para criar interfaces de usuário.

**Vuetify:** Biblioteca de componentes para Vue.js, seguindo os princípios do Material Design.

**Vite:** Ambiente de desenvolvimento e ferramenta de build rápida.

### Back-end

**Node.js:** Plataforma para executar código JavaScript no servidor.

**Express:** Framework Node.js para criação de APIs.

**Axios:** Ferramenta HTTP para realizar requisições assíncronas.

### Banco de Dados

**MySQL:** Sistema de gerenciamento de banco de dados relacional.

**Prisma:** Ferramenta que facilita a comunicação da API com o Banco de dados.

## O que você melhoraria se tivesse mais tempo?

1. Melhoraria o Design do front-end, bsucando uma paleta de cores mais harmoniosa e um design mais intuitivo.
2. Adicionaria uma tela de login para fazer a autenticação e autorização de usuários.
3. Criaria verificações e válidações para os campos dos formulários, para que tivessem uma formato fixo. Ex: (CPF -> 000.000.000-00)
4. Tentaria criar os testes unitários.

## Quais requisitos obrigatórios que não foram entregues?

- Creio que apenas as validações de formato dos dados inseridos nos campos não foram entregues.

_Ex: Obrigatório seguir essa formatação para o CPF -> 000.000.000-00 e essa para o e-mail -> user@gmail.com_

## Passo a Passo para o rodar o projeto

### Requisitos

- Para executar o projeto em sua máquina é necessário fazer algumas instalações:

1. **Git:** [Instale o Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)
2. **MySQL:** [Instale o MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-pt)
3. **Node.js:** [Instale o Node.js (Versão >= 16.13)](https://nodejs.org/en/download/package-manager)

### Passo 1 - Clonar o projeto

- Clone o projeto com o comando abaixo:

  `git clone https://github.com/LayzaDev/challenge-full-stack-web.git`

### Passo 2 - Atualizar a URL do MySQL

1. Navegue até a pasta **backend** do projeto
2. Crie um arquivo **.env** na pasta **backend**
3. Insira a URL abaixo, colocando a senha do seu MySQL:

   `DATABASE_URL="mysql://root:senha@localhost:3306/db"`

### Passo 3 - Executar o Back-end

1. No terminal, navegue até a pasta **backend**
2. Execute os seguintes comandos:

   `npm install 
-- irá instalar todas as dependencias necessárias`

   `npx prisma generate`

   `npx prisma db push`

   `node server.js`

### Passo 4 - Executar o Front-end

1. No terminal, navegue até a pasta **frontend**
2. Execute os seguintes comandos:

   `npm install 
-- irá instalar todas as dependencias necessárias`

   `npm run dev`

### Passo 5 - Abrir o projeto no navegador

- Ao executar o Front-end, irá aparecer um link parecido com o exemplo abaixo, dê um CTRL + click e o projeto irá abrir no seu navegador:

  `Local:   http://localhost:5173/`
