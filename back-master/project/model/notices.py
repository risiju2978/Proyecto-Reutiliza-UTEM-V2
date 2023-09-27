from project import db, errors_manager
from datetime import datetime
from project.model.users import User
from project.model.communes import Commune
from project.model.states import Statesnotice
from project.model.categories import Category
from project.model.noticescategories import Noticescategory
from project.model.imagesnotices import Imagesnotice
from sqlalchemy import and_, desc
import base64


class Notice(db.Model):
    __tablename__ = 'notices'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.String())
    id_statenotices = db.Column(db.Integer, db.ForeignKey('statesnotices.id'), nullable=False, default=1)
    start_date = db.Column(db.DateTime, default=datetime.utcnow())
    change_date = db.Column(db.DateTime, default=datetime.utcnow())
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    id_comuna = db.Column(db.Integer, db.ForeignKey('communes.id'), nullable=False)
    image = db.relationship('Imagesnotice', backref='idnotice', lazy='dynamic',
                            foreign_keys='[Imagesnotice.id_notice]')
    noticecat = db.relationship('Noticescategory', backref='idnoticecat', lazy='dynamic',
                                foreign_keys='[Noticescategory.id_notice]')

    def __init__(self, title, description, id_statenotices, start_date, change_date, id_user, id_comuna):
        self.title = title
        self.description = description
        self.id_statenotices = id_statenotices
        self.start_date = start_date
        self.change_date = change_date
        self.id_user = id_user
        self.id_comuna = id_comuna

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def filter_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    # Por id de aviso
    @classmethod
    def change_states(self, id_, rejected, deactivate):
        noticeproof = Notice.query.filter_by(id=id_).first()
        if (noticeproof is None):
            return errors_manager('This notice does not exist'), 500

        stateproof1 = Statesnotice.query.filter_by(id=noticeproof.id_statenotices).first()

        try:
            if (stateproof1.id == 1 and rejected is None):
                noticeproof.id_statenotices = 3

            if (stateproof1.id == 1 and rejected is not None):
                noticeproof.id_statenotices = 2

            if (stateproof1.id in [3, 4] and deactivate is None):
                noticeproof.id_statenotices = noticeproof.id_statenotices + 1

            if (deactivate is not None):
                noticeproof.id_statenotices = 2

            noticeproof.change_date = datetime.utcnow()
            stateproof2 = Statesnotice.query.filter_by(id=noticeproof.id_statenotices).first()
            db.session.commit()
            return {'Notice': '{} change to state {}'.format(noticeproof.id, stateproof2.value)}

        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def return_all_filter_by(self, id_notice, title, state, location, category, user, recent):
        conditions = []
        if id_notice is not None:
            conditions.append(Notice.id == id_notice)
            print(Notice.id == id_notice)
        if state is not None:
            conditions.append(Notice.id_statenotices == state)
        if location is not None:
            conditions.append(Notice.id_comuna == location)
        if user is not None:
            conditions.append(Notice.id_user == user)
        if title is not None:
            conditions.append(Notice.title.like('%'+title+'%'))

        NoticeConditions = Notice.query.filter(and_(*conditions))

        if recent is not None:
            conditions.append(Notice.id_statenotices == "3")
            NoticeConditions = Notice.query.filter(and_(*conditions)).order_by(desc(Notice.change_date)).limit(8)

        try:
            def to_json(x):
                stateproof = Statesnotice.filter_by_id(x.id_statenotices)
                userproof = User.find_by_id(x.id_user)
                comunaproof = Commune.find_by_id(x.id_comuna)
                imagesproof = Imagesnotice.find_by_id_notice(x.id)
                categoryNoticeproof = Noticescategory.find_by_id_notice(x.id)
                listcategories = []
                listimages = []
                for i in categoryNoticeproof:
                    categoryproof = Category.filter_by_id(i.id_category)
                    listcategories.append(categoryproof.name)
                for j in imagesproof:
                    newimage = (j.img_data)
                    base64EncodedStr = str(base64.b64encode(newimage))
                    listimages.append(base64EncodedStr)

                return {
                    'id': x.id,
                    'title': x.title,
                    'description': x.description,
                    'statevalue': stateproof.value,
                    'name_commune': comunaproof.name,
                    'region': comunaproof.region,
                    'id_user': x.id_user,
                    'name_user': userproof.name,
                    'campus': userproof.campus,
                    'start_date': x.start_date.isoformat(),
                    'change_date': x.change_date.isoformat(),
                    'categories': str(listcategories),
                    'images_notice': listimages
                }
            return ({'Notice': list(map(lambda x: to_json(x), NoticeConditions))})
        except Exception as err:
            return errors_manager('poner mensaje', err), 500
