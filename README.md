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
npm install && npm run build
```

### 🔧 Executar migrações ou sincronizar banco (conforme config TypeORM)
```bash
npm run migration:run
```
### ▶️ Rodar o projeto
```bash
npm run start:dev
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
  "matricula": "0011",
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

---

### `GET /colaboradores`
Retorna todos os colaboradores cadastrados.

---

### `GET /colaboradores/find-me`
Retorna os dados do usuário logadp.


---

### `PATCH /colaboradores/:id`
Alteração de informações do cadastro de colaborador.

**Request:**
```json
{
  "cargo": "Vigilante",
  "setor": "Almoxarifado",
  "lideranca": true,
  "nome_lideranca": "Lucas Silva",
  "permissao": "ALMOXARIFADO",
  "senha": "senha123"
}
```
---

### `PATCH /colaboradores/:id/status`
Desativar colaborador no sistema
**Response:**
```json
{
	"message": "Colaborador reativado com sucesso"
}
```
---

### `GET /colaboradores/find-lead`
Retorna os todos os colaboradores considerados lideranças.

---

### `POST /colaboradores/forgot-password`
Reset da senha via matrícula
**Request:**
```json
{
  "matricula": "11111",
  "novaSenha": "senhaNova"
}
```

**Response (200 OK):**
```json
{
	"message": "Senha atualizada com sucesso"
}
```

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

### `GET /equipamentos/:id`
Retorna informações de um equipamento

---

### `GET /equipamentos/`
Retorna todos os equipamentos cadastrados.

---

### `PATCH /equipamentos/:id/status`
Desativar equipamento no sistema.
**Response:**
```json
{
	"message": "Equipamento reativado com sucesso"
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

### `GET /solicitacoes/`
Retorna todas as solicitações cadastradas.

---

### `GET /solicitacoes/pending`
Retorna todas as solicitações pendentes.

---

### `GET /solicitacoes/my-request`
Retorna todas as solicitações cadastradas pelo usuário logado.

---

### `PUT /solicitacoes/delivery`
Confirmação de entrega do EPI solicitado.

**Request:**
```json
{
	"id": 1
}
```
---
### `PUT /solicitacoes/aprove`
Confirma se a ficha será aprovada ou rejeitada pelo almoxarifado.
**Request:**
```json
{
	"status": "REJEITADA",
	"id": 2
}
```
---
