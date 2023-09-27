from project import db, errors_manager


class Commune(db.Model):
    __tablename__ = 'communes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    region = db.Column(db.String(), nullable=False)
    notices = db.relationship('Notice', backref='id_comunne', lazy='dynamic', foreign_keys='[Notice.id_comuna]')

    def __init__(self, name, region):
        self.name = name
        self.region = region

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def return_all_communes():
        try:
            def to_json(x):
                return {
                    'id': x.id,
                    'name': x.name
                }
            return {'Commune': list(map(lambda x: to_json(x), Commune.query.all()))}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    def return_all_region():
        try:
            def to_json(x):
                return {
                    'region': x.region
                }
            return {'Region': list(map(lambda x: to_json(x), Commune.query.distinct('region')))}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def get_for_region(self, region_):
        try:
            def to_json(x):
                return {
                    'id': x.id,
                    'name': x.name
                }
            return {'Commune': list(map(lambda x: to_json(x), Commune.query.filter_by(region=region_).all()))}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def find_all_for_name(self, name_):
        try:
            def to_json(x):
                return {
                    'id': x.id,
                    'name': x.name,
                    'region': x.region
                }
            communes_filter_by_regex = Commune.query.filter(Commune.name.like('%'+name_+'%')).all()
            return {'Commune': list(map(lambda x: to_json(x), communes_filter_by_regex))}

        except Exception as err:
            return errors_manager('poner mensaje', err), 500
