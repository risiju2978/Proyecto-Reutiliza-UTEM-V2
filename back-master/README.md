# Pasos para instalación

## 1. Crear virtual env
py -3 -m venv venv  # Windows

python3 -m venv venv  # Linux

## 2. Activar el virtual env
venv\Scripts\activate  # Windows

. venv/bin/activate  # Linux

## 3. Instalación
pip install -r requirements.txt
pip freeze > requirements.txt 

## 4. Agregar variables de ambiente
export FLASK_APP=app.py flask run
export APP_SETTINGS="config.DevelopmentConfig"
export DATABASE_URL="postgresql+psycopg2://gina:topsecret123@localhost/db_reutiliza"

## 5. Creacion de la Base de datos
### OJO: Remover la carpeta migrations y la tabla alembic_version antes de realizar init
python manage.py db init

python manage.py db migrate

python manage.py db upgrade

## 6. Levantar servidor
python manage.py run