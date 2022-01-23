# Shipment CLI
Validador de métodos de frete para um CEP e um valor. A app recebe os dados para validação pelo stdin e retorna a saída da validação na stdout.

### Desafios infrentados
Como fazer um teste funcional pra uma app que lê do stdin e retorna no stdout? Um jeito é usando o `exec` do `child_process`.

### Ingredients
- Typescript
- Jest

### Instalando o projeto
Clone o projeto na sua máquina e instale as dependências com: `npm install`

### Rodando o projeto
```bash
npm run build
cat fixtures/example.txt | node dist/src/cli/cli.js > output.txt
```

### Rodando os testes
```bash 
npm t #roda os testes unitários e funcionais
```
