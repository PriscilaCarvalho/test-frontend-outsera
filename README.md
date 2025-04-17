
# 🎬 Golden Raspberry Awards

Aplicação Angular para listagem e análise de filmes vencedores de prêmios.

## 🔍 Visão Geral

Este projeto foi criado com Angular 19.2.7 e utiliza bibliotecas como:

- PrimeNG
- ngx-translate (i18n)
- Angular CLI

Funcionalidades principais incluem:
- Listagem de filmes paginada
- Filtro por ano e vencedores
- Estatísticas por produtor e estúdio

---

## 🧩 Requisitos para Rodar a Aplicação

Antes de executar o projeto, verifique se você tem os seguintes requisitos instalados:

| Requisito     | Versão recomendada      | Instalação                                  |
|---------------|-------------------------|----------------------------------------------|
| **Node.js**   | >=14.0.0 (preferência 18.x LTS) | https://nodejs.org                         |
| **npm**       | >=6                    | Vem com o Node.js                            |
| **Angular CLI** | >=15.x (ideal: 19.2.7) | npm install -g @angular/cli                |
| **Git**       | Qualquer versão atual   | https://git-scm.com                          |

Opcional:
- **VS Code** com extensão Angular para facilitar o desenvolvimento
- **Compodoc** para gerar documentação técnica
- **Docker** se desejar containerizar a aplicação

---

## 📁 Estrutura do Projeto

```bash
src/
├── app/
│   ├── views/                  # Páginas principais
│   │   ├── movie-list/
│   │   └── dashboard/          # Submódulos com estatísticas
│   ├── shared/                 # Serviços, Interceptors, componentes reutilizáveis e interfaces
│   └── app.module.ts          # Módulo principal
├── assets/i18n/               # Traduções
└── environments/              # Ambientes dev/prod
```

## 🔧 Serviços

### `MovieService`

Serviço responsável por consumir a API de filmes.

## 🌐 Internacionalização

O projeto usa `ngx-translate`. Arquivos de tradução ficam em:

```bash
src/assets/i18n/
├── en.json
└── pt-BR.json
```

---

## ▶️ Como Executar Localmente

1. Instale as dependências:

```bash
npm install
```

2. Rode a aplicação:

```bash
ng serve
```

3. Acesse: `http://localhost:4200/`

---

## 🚀 Deploy

1. Gere o build de produção:

```bash
ng build --configuration production
```

2. Publique a pasta gerada `dist/test-frontend-outsera/` em um servidor (Apache, NGINX ou Vercel).

---

## 🧪 Testes

Para rodar os testes unitários com Karma:

```bash
ng test
```

---

## 📜 Licença

Este projeto é distribuído sob licença livre para fins educacionais e profissionais.
