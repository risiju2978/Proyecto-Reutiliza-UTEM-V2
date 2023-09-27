from project import db, errors_manager
from project.model.users import User


class Evaluation(db.Model):
    __tablename__ = 'evaluations'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    commentary = db.Column(db.String())
    id_from_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # desde
    id_to_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # para

    def __init__(self, score, commentary, id_from_user, id_to_user):
        self.score = score
        self.commentary = commentary
        self.id_from_user = id_from_user
        self.id_to_user = id_to_user

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_all_for_idUserTo(self, id_):
        evalproof = Evaluation.query.filter_by(id_to_user=id_).all()
        if (evalproof == []):
            return errors_manager('There are no reviews for this user'), 500

        try:
            def to_json(x):
                userproofFrom = User.find_by_id(x.id_from_user)
                return {
                    'id': x.id,
                    'id_from_user': x.id_from_user,
                    'nameFrom': userproofFrom.name,
                    'lastnameFrom': userproofFrom.lastname,
                    'img_data': str(userproofFrom.img_data),
                    'score': x.score,
                    'commentary': x.commentary
                }
            return {'Evaluations': list(map(lambda x: to_json(x), Evaluation.query.filter_by(id_to_user=id_).all()))}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    # Se retorna una evaluación por id de evaluatión
    # Para las notificaciones: Lo que alguien evaluo hacia ti
    @classmethod
    def get_for_id(self, id_):
        evalproof = Evaluation.query.filter_by(id=id_).first()
        if evalproof is None:
            return errors_manager('This evaluation does not exist'), 500

        userproofFrom = User.find_by_id(evalproof.id_from_user)
        try:
            return {
                'id': evalproof.id,
                'id_from_user': evalproof.id_from_user,
                'id_to_user': evalproof.id_to_user,
                'nameFrom': userproofFrom.name,
                'lastnameFrom': userproofFrom.lastname,
                'score': evalproof.score,
                'img_data': str(userproofFrom.img_data)
            }
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    # Promedio score por usuario
    @classmethod
    def get_score_for_idUserTo(self, id_):
        evalproof = Evaluation.query.filter_by(id_to_user=id_).all()
        if (evalproof == []):
            return errors_manager('There are no reviews for this user'), 500
        leng = len(evalproof)
        summ = 0
        try:
            for i in evalproof:

                summ = summ + i.score
            return summ/leng
        except Exception as err:
            return errors_manager('poner mensaje', err), 500
