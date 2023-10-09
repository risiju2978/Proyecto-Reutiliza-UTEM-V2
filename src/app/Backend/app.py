from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Datos ficticios para probar la API
data = [
    {
        "id": 1,
        "first_name": "Juan",
        "last_name": "Perez",
        "contact_number": "+56123456789",
        "sede": "Sede Central",
        "item_image": "https://example.com/images/item1.jpg",
        "item_description": "Arteculo de ejemplo 1"
    },
    {
        "id": 2,
        "first_name": "Maria",
        "last_name": "Gonzalez",
        "contact_number": "+56123456790",
        "sede": "Sede Norte",
        "item_image": "https://example.com/images/item2.jpg",
        "item_description": "Articulo de ejemplo 2"
    },
    {
        "id": 3,
        "first_name": "Carlos",
        "last_name": "Rodriguez",
        "contact_number": "+56123456791",
        "sede": "Sede Sur",
        "item_image": "https://example.com/images/item3.jpg",
        "item_description": "Articulo de ejemplo 3"
    }
]

@app.route('/api/resource/', methods=['GET'])
def get_resources():
    response = jsonify(data)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@app.route('/api/resource/<int:id>', methods=['GET'])
def get_resource_by_id(id):
    item = next((x for x in data if x["id"] == id), None)
    if item:
        print(jsonify(item.get(id)))
        return jsonify(item)
    else:
        return jsonify({"message": "Item not found"}), 404


@app.route('/api/resource/', methods=['POST'])
async def post_resource():
    try:
        # Verificar si todos los campos necesarios están presentes en el objeto enviado
        required_fields = ["contact_number", "first_name", "item_description", "item_image", "last_name", "sede"]
        if not all(field in request.json for field in required_fields):
            return jsonify({"message": "Bad request, missing fields"}), 400

        new_id = max([item['id'] for item in data], default=0) + 1

        # Crear el nuevo ítem basado en el objeto enviado
        new_item = {
            'contact_number': request.json['contact_number'],
            'first_name': request.json['first_name'],
            'item_description': request.json['item_description'],
            'id': new_id,
            'item_image': request.json['item_image'],
            'last_name': request.json['last_name'],
            'sede': request.json['sede']
        }

        # Añadir el nuevo ítem a la lista de datos
        data.append(new_item)
        return jsonify({"message": "Item successfully created"}), 201

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route('/api/resource/<int:id>', methods=['PUT'])
def put_resource(id):
    item = next((x for x in data if x["id"] == id), None)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    item.update(request.json)
    return jsonify(item)

@app.route('/api/resource/<int:id>', methods=['DELETE'])
def delete_resource(id):
    global data
    data = [x for x in data if x["id"] != id]
    return jsonify({"message": "Item deleted"})

if __name__ == '__main__':
    app.run(debug=True)

