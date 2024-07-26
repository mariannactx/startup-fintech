# Teste LeanSaúde - StartUp Fintech

## Diagrama da aplicação

```mermaid
sequenceDiagram
  actor User
  participant API as API (HTTP Server)
  participant Mongo as Mongo (Database)
  participant Redis
  participant Consumer as Queue Consumer
  User->>+API: http://localhost:3000/users
  API->>+Mongo: findAllUsers()
  Mongo->>-API: users information
  API->>-User: users information
  User->>+API: http://localhost:3000/users/transfer
  API->>+Redis: add transfer to queue
  Redis->>-API: job added to queue info
  API->>-User: job added to queue info
  Redis->>+Consumer: execute job 1
  Consumer-->>-Redis:
  Redis->>+Consumer: execute job 2
  Consumer-->>-Redis:
  Redis->>+Consumer: execute job 3
  Consumer-->>-Redis:
```

## Inicializar aplicação

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

## Testar aplicação

### Testes unitários

Executar, dentro das pastas /api e /redis-consumer, o comando `yarn test`

### Chamadas ao serviço HTTP

Há um arquivo chamado `api.http` que funciona junto com o plugin do Visual Studio Code `REST Client`. Este arquivo contém uma sequência de chamadas HTTP que testa as funcionalidades da aplicação. É preciso substituir
