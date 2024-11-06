
# Configuração de Projeto Node.js com TypeScript, ESLint, Prettier e Jest

Este tutorial fornece um passo a passo para configurar um projeto Node.js utilizando TypeScript, ESLint, Prettier e Jest para execução de testes.

Caso você já possua um projeto configurado. Você pode pular essas etapas e seguir para a seção de [análise de cobertura e qualidade de código com SonarQube](#sonarqube).

## Passo 1: Inicializar o Projeto

Primeiro, crie uma nova pasta para o seu projeto e inicialize um novo projeto Node.js:

```sh
mkdir meu-projeto
cd meu-projeto
npm init -y
```

## Passo 2: Instalar Dependências

Instale as dependências necessárias para TypeScript, ESLint, Prettier e Jest:

```sh
npm install --save-dev typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier jest ts-jest @types/jest
```

## Passo 3: Configurar TypeScript

Crie um arquivo `tsconfig.json` na raiz do projeto com o seguinte conteúdo:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src"
  ]
}
```

## Passo 4: Configurar ESLint

Crie um arquivo `.eslintrc.json` na raiz do projeto com o seguinte conteúdo:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## Passo 5: Configurar Prettier

Crie um arquivo `.prettierrc` na raiz do projeto com o seguinte conteúdo:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}
```

## Passo 6: Configurar Jest

Crie um arquivo `jest.config.js` na raiz do projeto com o seguinte conteúdo:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts']
};
```

## Passo 7: Configurar Scripts no `package.json`

Adicione os seguintes scripts no arquivo `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "lint": "eslint 'src/**/*.{js,ts}'",
    "format": "prettier --write 'src/**/*.{js,ts}'",
    "test": "jest",
    "test:coverage": "jest --coverage"
  }
}
```

## Passo 8: Criar Estrutura de Pastas

Crie a estrutura de pastas para o seu projeto:

```sh
mkdir src
```

## Passo 9: Criar Arquivos de Exemplo

Crie um arquivo de exemplo `src/operacoes.ts`:

```typescript
export class Operacoes {
  static soma = (a: number, b: number): number => a + b;
}
```

Crie um arquivo de teste `src/operacoes.spec.ts`:

```typescript
import { Operacoes } from '../operacoes';

describe('Operacoes', () => {
  it('soma should return the sum of two positive numbers', () => {
    expect(Operacoes.soma(2, 3)).toBe(5);
  });

  it('soma should return the sum of a positive and a negative number', () => {
    expect(Operacoes.soma(5, -3)).toBe(2);
  });

  it('soma should return the sum of two negative numbers', () => {
    expect(Operacoes.soma(-2, -3)).toBe(-5);
  });

  it('soma should return the sum when one of the numbers is zero', () => {
    expect(Operacoes.soma(0, 5)).toBe(5);
    expect(Operacoes.soma(5, 0)).toBe(5);
  });

  it('soma should return zero when both numbers are zero', () => {
    expect(Operacoes.soma(0, 0)).toBe(0);
  });
});
```

## Passo 10: Executar os Comandos

Execute os seguintes comandos para verificar se tudo está configurado corretamente:

```sh
npm run build
npm run lint
npm run format
npm run test
npm run test:coverage
```

Se todos os comandos forem executados com sucesso, seu projeto está configurado corretamente!

## Conclusão

Você configurou com sucesso um projeto Node.js com TypeScript, ESLint, Prettier e Jest. Agora você pode começar a desenvolver seu projeto com uma base sólida e ferramentas de qualidade de código.

---

## <a id="sonarqube"></a>Análise de Cobertura e Qualidade de Código com SonarQube

Este guia fornece instruções para configurar o SonarQube e executar uma análise de cobertura de código e qualidade em um projeto Node.js. O SonarQube é uma ferramenta de análise estática que identifica problemas de qualidade no código, como bugs, "code smells" e vulnerabilidades.

### Requisitos

1. **Servidor SonarQube**: Verifique se há um servidor SonarQube em execução. Você pode baixá-lo no [site oficial do SonarQube](https://www.sonarsource.com/products/sonarqube/downloads/).
2. **SonarScanner**: Instale o SonarScanner, que é utilizado para executar a análise e enviar os resultados para o SonarQube. O SonarScanner está disponível para download no [site oficial do SonarScanner](https://docs.sonarsource.com/sonarqube/10.4/analyzing-source-code/scanners/sonarscanner/).

### Configuração do Projeto para Análise

1. **Execute os testes** e gere o relatório de cobertura:
   ```sh
   npm run test:coverage
   ```
   Isso irá criar a pasta `coverage` com o arquivo `lcov.info` (relatório de cobertura em formato LCOV).

2. **Crie o arquivo `sonar-project.properties`** na raiz do seu projeto com o seguinte conteúdo:

   ```ini
   # Chave do projeto no SonarQube
   sonar.projectKey=chave_do_projeto

   # Nome do projeto no SonarQube
   sonar.projectName=nome_do_projeto

   # Versão do projeto
   sonar.projectVersion=1.0

   # Diretórios de código fonte a serem analisados
   sonar.sources=src

   # Diretórios de testes
   sonar.tests=src

   # Relatório de cobertura
   sonar.javascript.lcov.reportPaths=coverage/lcov.info

   # URL do servidor SonarQube
   sonar.host.url=http://localhost:9000

   # Token de autenticação do SonarQube
   sonar.token=seu_token_de_autenticacao

   # Exclua arquivos específicos da análise
   sonar.exclusions=**/*.spec.ts,**/*.test.ts
   ```

3. **Execute o SonarScanner** para analisar o projeto e enviar os resultados ao SonarQube:
   ```sh
   sonar-scanner
   ```

### Usando Docker para Configurar o SonarQube (Opcional)

Você pode configurar o SonarQube usando Docker. Abaixo está um exemplo de arquivo `docker-compose.yml` para iniciar o SonarQube e um banco de dados PostgreSQL:

```yaml
services:
  sonarqube:
    image: sonarqube:latest
    container_name: sonarqube
    ports:
      - "9000:9000"
    environment:
      - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
    depends_on:
      - db

  db:
    image: postgres:latest
    container_name: sonarqube_db
    environment:
      POSTGRES_USER: sonar
      POSTGRES_PASSWORD: sonar
      POSTGRES_DB: sonarqube
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Links Úteis

- [Baixar SonarQube](https://www.sonarsource.com/products/sonarqube/downloads/)
- [Baixar SonarScanner](https://docs.sonarsource.com/sonarqube/10.4/analyzing-source-code/scanners/sonarscanner/)
