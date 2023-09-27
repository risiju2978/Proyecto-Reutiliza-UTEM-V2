from flask import request
from flask_restplus import Namespace, Resource
from project.model.users import User
from project import errors_manager

add_user_namespace = Namespace("add_user")
get_users_namespace = Namespace("get_users")
deactivate_user_namespace = Namespace("deactivate_user")
activate_user_namespace = Namespace("activate_user")
change_to_admin_namespace = Namespace("change_to_admin")
change_to_notadmin_namespace = Namespace("change_to_notadmin")
modify_user_namespace = Namespace("modify_user")


class add_user(Resource):
    def post(self):
        body = request.form
        rut = body.get('rut')
        name = body.get('name')
        admin = body.get('admin')
        lastname = body.get('lastname')
        email = body.get('email')
        campus = body.get('campus')
        phonne = body.get('phonne')
        wsp = body.get('wsp', phonne)
        image = request.files.get('img')
        gender = body.get('gender')
        if wsp == "":
            wsp = phonne
        userFind = User.find_by_rut(rut)
        if(userFind is not None):
            return {'message': 'This user already exists'}, 500
        else:
            try:
                user = User(
                    rut=rut,
                    name=name,
                    is_admin=True if admin == '1' else False,
                    lastname=lastname,
                    email=email,
                    campus=campus,
                    img_data=image.read(),
                    phonne=phonne,
                    wsp=wsp,
                    gender=gender
                )
                user.save_to_db()
                return {'message': f'User {user.name} added, id={user.id}'}
            except Exception as err:
                return errors_manager('poner mensaje', err), 500


# Mostrar usuario por filtro
class get_users(Resource):
    def get(self):
        rut = request.args.get('rut')  # Usuario por rut
        is_active = request.args.get('is_active')  # Usuarios activos / desactivos
        is_admin = request.args.get('is_admin')  # Administradores o Usuarios
        id_ = request.args.get('id')  # Usuario por id
        if is_active is not None:
            is_active = bool(int(is_active))
        if is_admin is not None:
            is_admin = bool(int(is_admin))
        return User.return_all_filter_by(id_, rut, is_active, is_admin)


# Modificar usuario
class modify_user(Resource):
    def post(self, id_):
        body = request.json
        name = body.get('name', None)
        lastname = body.get('lastname', None)
        email = body.get('email', None)
        campus = body.get('campus', None)
        img_data = body.get('img_data', None)
        phonne = body.get('phonne', None)
        wsp = body.get('wsp', None)
        gender = body.get('gender', None)
        return User.modify_user_for_rut(id_, name, lastname, email, campus, img_data, phonne, wsp, gender)


# Eliminar o desactivar usuarios (por rut)
class deactivate_user(Resource):
    def post(self, id_):
        return User.change_to_desactive(id_)


class activate_user(Resource):
    def post(self, id_):
        return User.change_to_active(id_)


class change_to_admin(Resource):
    def post(self, id_):
        return User.change_to_admin(id_)


class change_to_notadmin(Resource):
    def post(self, id_):
        return User.change_to_notadmin(id_)


add_user_namespace.add_resource(add_user, "")
get_users_namespace.add_resource(get_users, "")
deactivate_user_namespace.add_resource(deactivate_user, "")
activate_user_namespace.add_resource(activate_user, "")
change_to_admin_namespace.add_resource(change_to_admin, "")
change_to_notadmin_namespace.add_resource(change_to_notadmin, "")
modify_user_namespace.add_resource(modify_user, "")
