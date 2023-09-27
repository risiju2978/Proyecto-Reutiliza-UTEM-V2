from flask import request
from flask_restplus import Namespace, Resource
from project.model.evaluations import Evaluation
from project.model.users import User
from project import errors_manager

add_evaluation_namespace = Namespace("add_evaluation")
get_evaluation_namespace = Namespace("get_evaluation")


# Se agrega evaluations por body
class add_evaluation(Resource):
    def post(self):
        body = request.json
        score = body.get('score')
        commentary = body.get('commentary')
        from_user = body.get('from_user')
        to_user = body.get('to_user')

        userFindfrom = User.find_by_id(from_user)
        userFindto = User.find_by_id(to_user)

        if (userFindfrom is None or userFindto is None):
            return errors_manager('One of the users does not exist'), 500

        try:
            evaluation = Evaluation(
                score=score,
                commentary=commentary,
                id_from_user=from_user,
                id_to_user=to_user
            )
            evaluation.save_to_db()
            return {'messagge': f'Evaluation from {from_user} to {to_user} added, id={evaluation.id} '}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

# Se obtienen evaluations por filtro Query params

# Evaluaciones que hizo un usuario (from)
# Evaluaciones que alguien hizo hacia otras persona

# Evaluaciones hacia un usuario (to)
# Evaluaciones que hicieron otros hacia una persona final


class get_evaluation(Resource):
    def get(self):

        # De otros a uno -> lo que todos comentaron de ti
        id_to_user = request.args.get('id_to_user')
        id_eval = request.args.get('id_eval')
        # Retorna evaluación promedio del usuario evaluado
        score = request.args.get('score')

        if (id_to_user is not None):
            userFindto = User.find_by_id(id_to_user)
            if (userFindto is None):
                return errors_manager('This user does not exist'), 500
            return Evaluation.get_all_for_idUserTo(id_to_user)
        if (id_eval is not None):
            return Evaluation.get_for_id(id_eval)
        if (score is not None):
            return Evaluation.get_score_for_idUserTo(score)


add_evaluation_namespace.add_resource(add_evaluation, "")
get_evaluation_namespace.add_resource(get_evaluation, "")
