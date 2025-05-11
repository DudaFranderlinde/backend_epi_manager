import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Usar ts-jest para rodar arquivos TypeScript
  testEnvironment: 'node', // Ambiente de execução do Jest (node.js)
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Extensões que o Jest pode entender
  rootDir: './', // Define o diretório raiz do projeto
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos TypeScript
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Resolve os aliases do tsconfig.json
  },
  testMatch: ['**/*.spec.ts'], // Encontra os arquivos de teste com a extensão .spec.ts
};

export default config;
