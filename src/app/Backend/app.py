from database.db_config import init_app as init_db
from flask import Flask, jsonify, request
from models.resource import Resource, db
from flask_cors import CORS
import config
from routes import init_routes  # Importa las rutas

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

init_db(app)
CORS(app)
init_routes(app)


if __name__ == '__main__':
    app.run(debug=True)
