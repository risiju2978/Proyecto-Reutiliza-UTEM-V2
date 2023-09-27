from project import db, errors_manager


class Statesnotice(db.Model):
    __tablename__ = 'statesnotices'

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(), unique=True, nullable=False)
    notices = db.relationship('Notice', backref='usernotice', lazy='dynamic', foreign_keys='[Notice.id_statenotices]')

    def __init__(self, value):
        self.value = value

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def filter_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def return_all():
        try:
            def to_json(x):
                return {
                    'id': x.id,
                    'value': x.value
                }
            return {'States notices': list(map(lambda x: to_json(x), Statesnotice.query.all()))}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def get_for_id(self, id_):
        try:
            statesnotice = Statesnotice.query.filter_by(id=id_).first()

            return {
                'id': statesnotice.id,
                'value': statesnotice.value
            }
        except Exception as err:
            return errors_manager('poner mensaje', err), 500


class Statesdemand(db.Model):
    __tablename__ = 'statesdemands'

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(), unique=True, nullable=False)
    demands = db.relationship('Demand', backref='statedemand', lazy='dynamic', foreign_keys='[Demand.id_statedemand]')

    def __init__(self, value):
        self.value = value

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def filter_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def return_all():
        try:
            def to_json(x):
                return {
                    'id': x.id,
                    'value': x.value
                }
            return {'States demands': list(map(lambda x: to_json(x), StatesDemand.query.all()))}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def get_for_id(self, id_):
        try:
            statesDemand = StatesDemand.query.filter_by(id=id_).first()

            return {
                'id': statesdemand.id,
                'value': statesdemand.value
            }
        except Exception as err:
            return errors_manager('poner mensaje', err), 500
