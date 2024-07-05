# Carregar variáveis de ambiente do arquivo .env
export $(cat .env | xargs)

# Aplicar migrações
python manage.py migrate

# Executar testes
python manage.py test

# Iniciar o servidor
python manage.py runserver 0.0.0.0:8000