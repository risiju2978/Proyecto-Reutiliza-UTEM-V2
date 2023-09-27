from project import db, errors_manager


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    description = db.Column(db.String())
    notcategory = db.relationship('Noticescategory', backref='idnotcategory',
                                  lazy='dynamic', foreign_keys='[Noticescategory.id_category]')

    def __init__(self, name, description):
        self.name = name
        self.description = description

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def filter_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def get_category(self, idcategory, namecategories, allcategories):
        name = False
        if allcategories is not None or namecategories is not None:
            categoryproof = Category.query.all()
            if (categoryproof == []):
                return errors_manager('There are no categories'), 500
            if namecategories is not None:
                name = True
        if idcategory is not None:
            categoryproof = Category.query.filter_by(id=idcategory).all()
            if (categoryproof == []):
                return errors_manager('There is no category with that id'), 500

        try:
            def to_json(x):
                if name:
                    return {
                        'id': x.id,
                        'name': x.name
                    }
                else:
                    return {
                        'id': x.id,
                        'name': x.name,
                        'description': x.description
                    }
            return {'Categories': list(map(lambda x: to_json(x), categoryproof))}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def delete_by_id(self, id_):
        try:
            category = Category.query.filter_by(id=id_).first()
            db.session.delete(category)
            db.session.commit()
            return {'Category': '{} row(s) deleted'.format(category.name)}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500
