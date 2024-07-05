# iCasei Front-End and BFF Project

Este projeto é uma aplicação front-end em HTML5 com dois micro-frontends (`mf_drawer` e `mf_videos`), utilizando a API do YouTube. O projeto também inclui um back-end para lidar com favoritos.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Estrutura do Projeto

- `mf_drawer`: Micro-frontend responsável pela navegação e carregamento de outros micro-frontends.
- `mf_videos`: Micro-frontend responsável por exibir vídeos e gerenciar favoritos.
- `bff`: Back-end para fornecer a funcionalidade de favoritos.

## Como configurar e rodar o projeto

### Passo 1: Clone o Repositório

Clone o repositório para o seu ambiente local:

+++

```bash
git clone <url-do-repositorio>
cd icasei
```

+++

### Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

+++

```makefile
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
```

+++

Substitua `YOUR_YOUTUBE_API_KEY` pela sua chave da API do YouTube.

### Passo 3: Rodar a Aplicação com Docker

Certifique-se de que o Docker e o Docker Compose estão instalados e rodando em seu sistema. Em seguida, execute os seguintes comandos para compilar e rodar a aplicação:

+++

```bash
docker-compose up --build
```

+++

### Passo 4: Acessar a Aplicação

Após iniciar os containers, acesse a aplicação no seu navegador:

- **Front-end**: [http://localhost:3000](http://localhost:3000)
- **Micro-frontend Videos**: [http://localhost:3001](http://localhost:3001)
- **Back-end**: [http://localhost:8000](http://localhost:8000)

## Testes

Para rodar os testes de cada componente, utilize os comandos abaixo:

### Testes do `mf_drawer`

+++

```bash
docker-compose run mf_drawer npm test
```

+++

### Testes do `mf_videos`

+++

```bash
docker-compose run mf_videos npm test
```

+++

### Testes do `bff`

+++

```bash
docker-compose run bff python manage.py test
```

+++

## Estrutura de Arquivos

- **mf_drawer/**
  - **public/**: Arquivos públicos do micro-frontend.
  - **src/**: Código-fonte do micro-frontend.
  - `server.js`: Servidor Express para servir o micro-frontend.
- **mf_videos/**
  - **public/**: Arquivos públicos do micro-frontend.
  - **src/**: Código-fonte do micro-frontend.
  - `server.js`: Servidor Express para servir o micro-frontend.
- **bff/**
  - **favorites/**: Aplicação Django para gerenciar favoritos.
  - `manage.py`: Ferramenta de linha de comando do Django.

## Endpoints da API

### `bff`

- `GET /api/search?q=<query>`: Busca vídeos no YouTube.
- `GET /api/favorites/list/`: Lista todos os vídeos favoritos.
- `POST /api/favorites/add/`: Adiciona um vídeo aos favoritos.
- `DELETE /api/favorites/remove/<video_id>/`: Remove um vídeo dos favoritos.

## Funcionalidades

- **Busca de Vídeos**: Pesquise vídeos no YouTube usando a API do YouTube.
- **Adicionar/Remover Favoritos**: Adicione ou remova vídeos dos favoritos.
- **Contador de Favoritos**: Veja o número total de favoritos na interface.
