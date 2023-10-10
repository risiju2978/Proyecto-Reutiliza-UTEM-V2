from flask import jsonify, request
from models.resource import Resource, db
import os
"""
UPLOAD_FOLDER = '/ruta/del/directorio/de/carga'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
"""
def init_routes(app):

    @app.route('/api/resource/', methods=['GET'])
    def get_resources():
        try:
            resources = Resource.query.all()
            return jsonify([resource.serialize() for resource in resources])
        finally:
            db.session.close()


    @app.route('/api/resource/<int:id>', methods=['GET'])
    def get_resource_by_id(id):
        try:
            resource = Resource.query.get(id)
            if resource:
                return jsonify(resource.serialize())
            else:
                return jsonify({"message": "Item not found"}), 404
        finally:
            db.session.close()

    @app.route('/api/resource/', methods=['POST'])
    def post_resource():
        try:
            required_fields = ["contact_number", "first_name", "item_description", "item_image", "last_name", "sede"]
            if not all(field in request.json for field in required_fields):
                return jsonify({"message": "Bad request, missing fields"}), 400

            new_resource = Resource(
                first_name=request.json['first_name'],
                last_name=request.json['last_name'],
                contact_number=request.json['contact_number'],
                sede=request.json['sede'],
                item_image=request.json['item_image'],
                item_description=request.json['item_description']
            )
            db.session.add(new_resource)
            db.session.commit()
            return jsonify(new_resource.serialize()), 201

        except Exception as e:
            db.session.rollback()  # En caso de error, revertimos cualquier cambio en la base de datos
            return jsonify({"message": f"Error: {str(e)}"}), 500

        finally:
            db.session.close()  # Aseguramos que la sesión se cierre independientemente de si hubo un error o no

    @app.route('/api/resource/<int:id>', methods=['PUT'])
    def put_resource(id):
        resource = Resource.query.get(id)
        if not resource:
            return jsonify({"message": "Item not found"}), 404

        # Actualizamos solo los campos que se envían en la solicitud
        for key, value in request.json.items():
            if hasattr(resource, key):  # Verificamos si el recurso tiene el atributo que queremos actualizar
                setattr(resource, key, value)

        try:
            db.session.commit()
            return jsonify(resource.serialize())
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Error: {str(e)}"}), 500
        finally:
            db.session.close()


    @app.route('/api/resource/<int:id>', methods=['DELETE'])
    def delete_resource(id):
        try:
            resource = Resource.query.get(id)
            if not resource:
                return jsonify({"message": "Item not found"}), 404

            db.session.delete(resource)
            db.session.commit()
            return jsonify({"message": "Item deleted"})

        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Error: {str(e)}"}), 500

        finally:
            db.session.close()
