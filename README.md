# 📦 Sistema de Solicitação de EPI — API (NestJS)

Este projeto tem como objetivo auxiliar no controle de fichas para solicitação de Equipamentos de Proteção Individual (EPI) dentro de uma organização. A aplicação é composta por um backend desenvolvido com **NestJS + TypeScript** e um frontend em **React + TypeScript**.

## 👤 Tipos de Usuário

- **Colaborador**: Pode solicitar EPIs, consultar solicitações realizadas e verificar equipamentos disponíveis.
- **Almoxarifado**: Responsável por aprovar solicitações, atualizar estoque e cadastrar ou editar EPIs.
- **Admin**: Controle total do sistema, incluindo o cadastro de novos colaboradores.

---

## 🚀 Como rodar o projeto

### 🧰 Requisitos

- Node.js 18+
- npm ou yarn
- PostgreSQL (ou outro banco compatível configurado no `.env`)
- Nest CLI (opcional): `npm i -g @nestjs/cli`

---

### 📁 Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### ⚙️ Configurar variáveis de ambiente
Crie um arquivo .env na raiz igual ao arquivo `env.example` disponível no diretório

### 📦 Instalar dependências
```bash
npm install
# ou
yarn
```

### 🔧 Executar migrações ou sincronizar banco (conforme config TypeORM)
```bash
npm run start:dev
# ou
yarn start:dev
```
### ▶️ Rodar o projeto
```bash
npm run start:dev
# ou
yarn start:dev
```
## 🧪 Testes Unitários Implementados

- `EquipamentoService`
  - Cadastrar um novo equipamento de proteção
  - Encontrar um equipamento pelo código
- `SolicitacaoService`
  - Criar uma nova solicitação
  - Lançar erro se o equipamento não for encontrado 
  - Lançar erro se o solicitante não for encontrado 
  - Lançar erro se o responsável não for encontrado
  - Retornar erro ao falhar ao salvar no banco
- `ColaboradorService`
  - Retornar colaborador pelo CPF
  - Criar colaborador com senha criptografada
  - Rejeitar criação se CPF já estiver cadastrado 
  - Lançar NotFoundException se não encontrar por matrícula
  - Retornar colaborador encontrado por matrícula
 
### 🧪 Rodar testes unitários
```bash
npm run test
# ou
yarn test
```

## 🔐 Autenticação

### `POST /auth/login`
Realiza o login com matrícula e senha.

**Request:**
```json
{
  "matricula": "admin123",
  "senha": "senhaSegura"
}
```

**Response (200 OK):**
```json
{
  "access_token": "<jwt-token>",
  "permissao": "ADMIN"
}
```

> ⚠️ Utiliza `UseGuards` com estratégia JWT e validação de permissão. Autorização é verificada via `@Roles(Permissao.ADMIN)` onde necessário.

---

## 👥 Colaboradores

### `POST /colaboradores`
Cadastra um novo colaborador (apenas para ADMIN).

**Request:**
```json
{
  "matricula": "12345",
  "nome": "Maria Souza",
  "cpf": "124.876.789-07",
  "cargo": "Supervisor",
  "setor": "Almoxarifado",
  "lideranca": true,
	"nome_lideranca": "Lucas Silva",
  "permissao": "ALMOXARIFADO",
  "senha": "senha123"
}
```

**Authorization:**
Header `Authorization: Bearer <token_do_admin>`

---

### `GET /colaboradores`
Retorna todos os colaboradores cadastrados **sem exibir senha e salt**.

---

## 🛠️ Equipamentos

### `POST /equipamentos`
Cadastra novo equipamento. O código do equipamento é **gerado automaticamente** iniciando em `4550000`.

**Request:**
```json
{
  "descricao": "Luva de proteção térmica",
  "ca": "12345",
  "dataValidade": "2025-12-31",
  "preco": 37.55555
}
```

**Response:**
```json
{
	"descricao": "Luva de proteção térmica",
	"preco": 37.55555,
	"dataValidade": "2025-12-31",
	"ca": "12345",
	"codigo": 4550008,
	"id": 1
}
```

---

## 📄 Solicitações

### `POST /solicitacoes`
Cria uma solicitação de EPI. A solicitação entra com status `PENDENTE`.

**Request:**
```json
{
  "equipamentoId": 4550008,
  "qtd": 2,
  "urgencia": "MEDIA",
	"responsavel": "Laura",
	"matricula_responsavel": "12345"
}
```

**Response:**
```json
{
  "status": "PENDENTE",
  "dataAbertura": "2025-05-11T14:00:00Z"
}
```

---
