from flask import request
from flask_restplus import Namespace, Resource
from project.model.notices import Notice
from project.model.categories import Category
from project import errors_manager
from project.model.noticescategories import Noticescategory
from project.model.imagesnotices import Imagesnotice

add_notice_namespace = Namespace("add_notice")
change_states_notices_namespace = Namespace("change_states_notices")
get_notice_namespace = Namespace("get_notice")


# Se agrega notice por body
class add_notice(Resource):
    def post(self):
        body = request.form
        title = body.get('title')
        description = body.get('description')
        id_statenotices = body.get('id_statenotices')
        start_date = body.get('start_date')
        change_date = body.get('change_date')
        id_user = body.get('id_user')
        id_comuna = body.get('id_comuna')
        categories = body.get('categories')
        images = request.files.getlist('img')
        try:
            notice = Notice(
                title=title,
                description=description,
                id_statenotices=id_statenotices,
                start_date=start_date,
                change_date=change_date,
                id_user=id_user,
                id_comuna=id_comuna
            )
            notice.save_to_db()
            if categories:
                categories = categories.split(',')
                for i in categories:
                    categoryproof = Category.find_by_name(i)
                    if categoryproof is not None:
                        noticescategory = Noticescategory(
                            id_notice=notice.id,
                            id_category=categoryproof.id
                        )
                        noticescategory.save_to_db()
            if images:
                for j in images:
                    imagesnotice = Imagesnotice(
                        img_data=j.read(),
                        id_notice=notice.id
                    )
                    imagesnotice.save_to_db()
            return {"mensaje": f'Notice {notice.title} added, id={notice.id}. id_categories_notice={noticescategory.id} and id_images_notice={imagesnotice.id}'}, 200
        except Exception as err:
            return errors_manager('poner mensaje', err), 500


class change_states_notices(Resource):
    def post(self):
        body = request.json
        id_notice = body.get('id_notice')
        rejected = body.get('rejected')
        deactivate = body.get('deactivate')
        return Notice.change_states(id_notice, rejected, deactivate)


class get_notice(Resource):
    def get(self):

        id_notice = request.args.get('id_notice')
        title = request.args.get('title')
        state = request.args.get('state')
        location = request.args.get('location')
        category = request.args.get('category')
        user = request.args.get('user')
        recent = request.args.get('recent')

        return Notice.return_all_filter_by(id_notice, title, state, location, category, user, recent)


add_notice_namespace.add_resource(add_notice, "")
change_states_notices_namespace.add_resource(change_states_notices, "")
get_notice_namespace.add_resource(get_notice, "")
