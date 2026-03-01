# ControleFinanceiro Web

Sistema frontend desenvolvido como parte do desafio técnico.

A aplicação é responsável pela interface do usuário do sistema de gestão financeira, consumindo a **ControleFinanceiro REST API** e permitindo controle de receitas, despesas, categorias, pessoas, usuários e visualização de métricas financeiras através de dashboard analítico.

---

# Arquitetura

O projeto foi desenvolvido utilizando **arquitetura modular baseada em separação de responsabilidades**, garantindo organização, escalabilidade e baixo acoplamento.

Pages (UI)  
↓  
Components (Reutilizáveis)  
↓  
Core (Infraestrutura)  
↓  
API Services (Axios)  
↓  
Backend REST (.NET)

## Camadas Internas

**Pages**  
Responsáveis pelas telas principais da aplicação.

**Components**  
Componentes reutilizáveis como layout, sidebar, modais e componentes de UI.

**Core / API**  
Serviços responsáveis pela comunicação HTTP com a API.

**Core / Auth**  
Gerenciamento de autenticação e controle de sessão JWT.

**Core / Theme**  
Gerenciamento de tema (Dark / Light Mode).

**Core / Types**  
DTOs e contratos tipados utilizados na integração com o backend.

**Core / Utils**  
Funções auxiliares e utilitários globais.

Essa separação garante:

• Baixo acoplamento  
• Alta coesão  
• Facilidade de manutenção  
• Escalabilidade futura  
• Clareza arquitetural  

---

# Tecnologias Utilizadas

• React 19  
• TypeScript  
• Vite  
• React Router DOM  
• Axios  
• React Hook Form  
• Zod  
• TailwindCSS  
• Material UI (DataGrid)  
• Recharts  
• Lucide Icons  
• React Hot Toast  

---

# Autenticação e Segurança

A autenticação é realizada através de **JWT** fornecido pela API backend.

## Fluxo de autenticação

1. Usuário realiza login.
2. API retorna token JWT.
3. Token é armazenado localmente.
4. Axios interceptor adiciona automaticamente o token nas requisições:

5. Rotas protegidas utilizam `PrivateRoute`.
6. Controle de acesso baseado em role:
   - Administrador
   - Usuário

## Segurança implementada

• Proteção de rotas privadas  
• Controle de acesso por role  
• Interceptor HTTP automático  
• Logout seguro  
• Isolamento visual baseado no perfil  

---

# Funcionalidades

## Dashboard

### Resumo

• Total de receitas  
• Total de despesas  
• Saldo consolidado  

### Gastos por dia

• Agrupamento por data  
• Consulta por período  

### Gastos por pessoa

• Agrupamento por pessoa  
• Ordenado por maior valor  

### Totais por Pessoa

• Receita total  
• Despesa total  
• Saldo individual  
• Total geral consolidado  

### Totais por Categoria

• Receita total  
• Despesa total  
• Saldo por categoria  
• Total geral consolidado  

• Filtro por período (7, 30, 90 dias)

---

## Transações

• Cadastro de receita ou despesa  
• Vinculação obrigatória a:
  - Pessoa
  - Categoria  
• Validações com Zod  
• Conversão segura de datas  
• Paginação server-side  
• Atualização  
• Exclusão  

---

## Categorias

• Cadastro  
• Atualização  
• Exclusão  
• Definição de finalidade (Receita ou Despesa)  

---

## Pessoas

• Cadastro  
• Atualização  
• Exclusão  
• Paginação  
• Integração com transações  

---

## Usuários

• Cadastro  
• Atualização  
• Exclusão  
• Controle por role  
• Visualização restrita para usuário comum  

---

# Estrutura do Projeto

src/
│
├── app
├── components
│ ├── layout
│ └── ui
│
├── core
│ ├── api
│ ├── auth
│ ├── theme
│ ├── types
│ └── utils
│
├── pages
│ ├── dashboard
│ ├── transacoes
│ ├── categorias
│ ├── pessoas
│ ├── usuarios
│ └── login
│
└── main.tsx


---

# Integração com API

## Dashboard

GET /api/Dashboard/Resumo  
GET /api/Dashboard/GastosPorDia  
GET /api/Dashboard/GastosPorPessoa  
GET /api/Dashboard/TotaisPorPessoa  
GET /api/Dashboard/TotaisPorCategoria  

## Transações

GET /api/Transacoes/Get  
POST /api/Transacoes/Cadastrar  
PUT /api/Transacoes/Editar/{id}  
DELETE /api/Transacoes/Deletar/{id}  

## Demais Recursos

Categorias  
Pessoas  
Usuários  
Autenticação  

---

# Como Executar o Projeto

## 1️ - Clonar repositório

git clone https://github.com/seu-repositorio.git

## 2️ - Instalar dependências

npm install

## 3️ - Executar aplicação

npm run dev

### A aplicação estará disponível em:

http://localhost:5173

---

# Build de Produção

npm run build


---

# Decisões Arquiteturais

• Separação clara entre infraestrutura e UI  
• Serviços HTTP centralizados  
• DTOs tipados para integração segura  
• Validação declarativa com Zod  
• Componentização reutilizável  
• Paginação server-side  
• Estrutura preparada para crescimento  
• Controle de estado simples e previsível  

---

# Diferenciais Técnicos

• Tipagem forte com TypeScript  
• Integração estruturada com API REST  
• Dashboard com agregações analíticas  
• DataGrid com paginação server-side  
• Sistema de tema com Context API  
• Organização modular escalável  
• Código preparado para expansão futura  
• Interface responsiva e adaptável ao tema  

---

# Considerações Finais

O frontend foi desenvolvido com foco em:

• Clareza arquitetural  
• Organização modular  
• Segurança  
• Experiência do usuário  
• Escalabilidade  
• Boas práticas modernas em React  