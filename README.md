
# Teste iCasei - Front-End

## Introdução

Este projeto consiste em uma aplicação HTML5 que utiliza micro-frontends e um backend Django para buscar e gerenciar vídeos do YouTube.

## Requisitos

- Docker
- Docker Compose
- Python 3.10
- Node.js

## Instalação

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd teste-icasei
```

### 2. Configurar o Ambiente Virtual e Instalar Dependências do Backend

```bash
cd bff
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 3. Configurar e Rodar os Containers Docker

```bash
docker-compose up --build
```

## Compilação e Execução

Após executar o comando acima, os serviços estarão disponíveis nos seguintes endereços:

- BFF (Django): <http://localhost:8000>
- MF_DRAWER: <http://localhost:3000>
- MF_VIDEOS: <http://localhost:3001>

## Testes

Para rodar os testes unitários, utilize os comandos apropriados para cada serviço. No caso do Django, por exemplo:

```bash
docker-compose exec bff python manage.py test
```

## Observações

- Código feito seguindo padrões e boas práticas de arquitetura.
- Utilizado a API de busca do YouTube para buscar e listar vídeos.
- Navegação por rotas é requisito obrigatório.
