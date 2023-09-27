from project import db


class Noticescategory(db.Model):
    __tablename__ = 'noticescategories'

    id = db.Column(db.Integer, primary_key=True)
    id_notice = db.Column(db.Integer, db.ForeignKey('notices.id'), nullable=False)  # desde
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)  # para

    def __init__(self, id_notice, id_category):
        self.id_notice = id_notice
        self.id_category = id_category

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id_notice(cls, id):
        return cls.query.filter_by(id_notice=id).all()
