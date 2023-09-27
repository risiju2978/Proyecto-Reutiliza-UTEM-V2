from flask import request
from flask_restplus import Namespace, Resource
from project.model.categories import Category
from project import errors_manager

add_category_namespace = Namespace("add_category")
get_category_namespace = Namespace("get_category")
delete_by_id_category_namespace = Namespace("delete_by_id_category")

# Se agrega categoria por body


class add_category(Resource):
    def post(self):
        body = request.json
        name = body.get('name')
        description = body.get('description')
        print(name)
        categoryFind = Category.find_by_name(name)
        print(categoryFind)
        if categoryFind is not None:
            return errors_manager(f'This category already exists {categoryFind.name}'), 500
        else:
            try:
                category = Category(
                    name=name,
                    description=description
                )
                category.save_to_db()
                return errors_manager(f'Category {category.name} added, id={category.id}'), 200
            except Exception as err:
                return errors_manager('poner mensaje', err), 500


# Se obtienen categorias por filtro Query params
class get_category(Resource):
    def get(self):

        idcategory = request.args.get('idcategory')
        namecategories = request.args.get('namecategories')
        allcategories = request.args.get('allcategories')

        return Category.get_category(idcategory, namecategories, allcategories)


# Se elimina categoria por id
class delete_by_id_category(Resource):
    def delete(self, id_):
        categoryFind = Category.filter_by_id(id_)
        if (categoryFind is None):
            return errors_manager('This category does not exist'), 500
        return Category.delete_by_id(id_)


add_category_namespace.add_resource(add_category, "")
get_category_namespace.add_resource(get_category, "")
delete_by_id_category_namespace.add_resource(delete_by_id_category, "")
