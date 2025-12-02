![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso **Playwright Zombie Edition**!

O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

Nesse curso, foram abordados diversos assuntos, como:

- Interagir com diversos elementos da página, como inputs, botões, popups e toasts
- Diferentes formas de localizar elementos no Playwright, com `locator()`, `getByText()`, `getByPlaceholder()`, entre outros
- Fazer validações de resultados esperados com o `expect()`
- Aplicar **Faker** para geração de dados de teste dinamicamente
- Uso do padrão **Page Object Model** para melhorar a manutenibilidade do código
- Exploração de **testes independentes** e sua importância
- Fazer requisições HTTP com o contexto de `request` do Playwright para apoiar na preparação da base de dados para teste
- Executar comandos no banco de dados para apoiar na preparação da base de dados para teste
- Criação de **relatórios** ricos na nuvem para análise de resultados

## 📺 Sistema alvo dos testes

O Zombie+ é um sistema web de gestão de catálogo de filmes e séries sobre Zumbis.

Com uma interface inspirada no Disney+, Zombie+ é um sistema web moderno desenvolvido com ReactJS, incorporando autenticação JWT, integração com API REST em Node.js e armazenamento de dados no PostgreSQL.

O repositório desse projeto pode ser visualizado [aqui](https://github.com/cmath0/zombieplus).

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências
```
npm install
```

2. Executar testes em modo Headless
```
npx playwright test 
```

3. Visualizar o relatório dos testes
```
npx playwright show-report
```
