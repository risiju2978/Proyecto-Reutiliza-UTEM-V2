from project import db


class Imagesnotice(db.Model):
    __tablename__ = 'imagesnotices'

    id = db.Column(db.Integer, primary_key=True)
    img_data = db.Column(db.LargeBinary)  # Cambiar a nullable = Falsename = db.Column(db.Integer, nullable = False)
    id_notice = db.Column(db.Integer, db.ForeignKey('notices.id'), nullable=False)

    def __init__(self, img_data, id_notice):
        self.img_data = img_data
        self.id_notice = id_notice

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_id_notice(cls, id):
        return cls.query.filter_by(id_notice=id).all()
