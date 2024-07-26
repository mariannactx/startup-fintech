# Teste LeanSaúde - StartUp Fintech

- [Diagrama da aplicação](#Diagrama-da-aplicação)
- [Inicializar aplicação](#Inicializar-aplicação)
- [Testar aplicação](#Testar-aplicação)

## Diagrama do sistema

### Transferir

```mermaid
sequenceDiagram
  actor User
  participant API as API (Servidor HTTP)
  participant Redis
  participant Mongo as MongoDB (Banco de dados)
  participant Consumer as Consumidor da fila/Redis
  User->>+API: PATCH http://localhost:3000/users/transfer
  API->>+Redis: adicionar tarefa de transferência à fila
  Redis->>-API: informações da tarefa adicionada
  API->>-User: informações da tarefa adicionada
  Redis->>+Consumer: executar tarefa
  Consumer->>+Mongo: encontrar usuários, validar e transferir
  Mongo->>-Consumer: resultado da transferência
  Consumer-->>-Redis: informações de sucesso/falha da tarefa
```

### Operações de leitura/escrita de usuários

```mermaid
sequenceDiagram
  actor User
  participant API as API (HTTP Server)
  participant Mongo as Mongo (Database)
  User->>+API: POST http://localhost:3000/users
  API->>+Mongo: validar e criar usuário
  Mongo->>-API: informações do usuário
  API->>-User: informações do usuário
  User->>+API: GET http://localhost:3000/users
  API->>+Mongo: buscar todos os usuários
  Mongo->>-API: informações dos usuários
  API->>-User: informações dos usuários
  User->>+API: GET http://localhost:3000/users/balance/userId
  API->>+Mongo: buscar usuário
  Mongo->>-API: saldo do usuário
  API->>-User: saldo do usuário
```

## Inicializar sistema

### Pré-requisitos

Para inicializar a aplicação, é necessário ter instalado:

- Docker
- Docker Compose

### Inicialização

```bash
./init.sh
```

É importante aguardar até que o container `teste-leansaude-api` esteja saudável. Para garantir isso, é possível verificar se o container possui status `(healthy)` com o comando abaixo, que deve retornar informações do container:

```bash
docker container ls --filter "name=teste-leansaude-api" --filter "health=healthy"
```

## Testar aplicações

### Testes unitários

Executar, dentro das pastas /api e /redis-consumer, o comando `yarn test`. Pode ser executado sem inicializar as aplicações.

### Chamadas ao serviço HTTP

Há um arquivo chamado `api.http` que funciona junto com o plugin do Visual Studio Code `REST Client`. Este arquivo contém uma sequência de chamadas HTTP que testa as funcionalidades da aplicação. É preciso substituir <userId> pelo valor correspondente após a criação dos usuários. Precisa ser executado após a inicialização do sistema.
