import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()


def create_app(script_info=None):
    '''
    Inicia APP Flask para MS
    '''

    app = Flask(__name__)

    # set config
    app.config.from_object(os.environ['APP_SETTINGS'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    cors.init_app(app, resources={r"*": {"origins": "*"}})

    # register api
    from project.api import api
    api.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    return app


def errors_manager(message='sin mensaje', description='sin descripcion'):
    return {
        'mensaje': str(message),
        'descripcion': str(description)
    }
