from project import db, errors_manager
from sqlalchemy import and_


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    rut = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    lastname = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    campus = db.Column(db.String(), nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    img_data = db.Column(db.LargeBinary)  # TODO: Cambiar a nullable = False
    phonne = db.Column(db.String(), unique=True, nullable=False)
    wsp = db.Column(db.String(), nullable=False)
    evaluations_from = db.relationship('Evaluation', backref='from_user',
                                       lazy='dynamic', foreign_keys='[Evaluation.id_from_user]')
    evaluations_to = db.relationship('Evaluation', backref='to_user', lazy='dynamic',
                                     foreign_keys='[Evaluation.id_to_user]')
    notices = db.relationship('Notice', backref='userNotice', lazy='dynamic', foreign_keys='[Notice.id_user]')
    demands = db.relationship('Demand', backref='userdemand', lazy='dynamic', foreign_keys='[Demand.id_user]')

    def __init__(self, rut, name, is_admin, lastname, email, campus, img_data, phonne, wsp, gender):
        self.rut = rut
        self.name = name
        self.lastname = lastname
        self.is_admin = is_admin
        self.email = email
        self.campus = campus
        self.img_data = img_data
        self.phonne = phonne
        self.wsp = wsp
        self.gender = gender

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update_to_db(self):
        db.session.commit()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def change_to_desactive(self, id_):
        userproof = User.query.filter_by(id=id_).first()
        if (userproof is None):
            return errors_manager('This user does not exist'), 500
        if userproof.is_active:
            userproof.is_active = False
            db.session.commit()
            return {'User': '{} its desactivated now, rut={}'.format(userproof.name, userproof.rut)}
        else:
            return errors_manager('This user is already deactivated'), 500

    @classmethod
    def change_to_active(self, id_):
        userproof = User.query.filter_by(id=id_).first()
        if (userproof is None):
            return errors_manager('This user does not exist'), 500
        if not userproof.is_active:
            userproof.is_active = True
            db.session.commit()
            return {'User': '{} its activated now, rut={}'.format(userproof.name, userproof.rut)}
        else:
            return errors_manager('This user is already activated'), 500

    @classmethod
    def change_to_admin(self, id_):
        userproof = User.query.filter_by(id=id_).first()
        if (userproof is None):
            return errors_manager('This user does not exist'), 500
        if not userproof.is_admin:
            userproof.is_admin = True
            db.session.commit()
            return {'User': '{} its admin now, rut={}'.format(userproof.name, userproof.rut)}
        else:
            return errors_manager('This user is already admin'), 500

    @classmethod
    def change_to_notadmin(self, id_):
        userproof = User.query.filter_by(id=id_).first()
        if (userproof is None):
            return errors_manager('This user does not exist'), 500
        if userproof.is_admin:
            userproof.is_admin = False
            db.session.commit()
            return {'User': '{} its notadmin now, rut={}'.format(userproof.name, userproof.rut)}
        else:
            return errors_manager('This user is not administrator'), 500

    @classmethod
    def modify_user_for_rut(self, id_, name, lastname, email, campus, img_data, phonne, wsp, gender):
        try:
            userproof = User.query.filter_by(id=id_).first()
            if (userproof is None):
                return errors_manager('This user does not exist'), 500
            if (name is not None):
                userproof.name = name
            if (lastname is not None):
                userproof.lastname = lastname
            if (email is not None):
                userproof.email = email
            if (campus is not None):
                userproof.campus = campus
            if (img_data is not None):
                userproof.img_data = img_data
            if (phonne is not None):
                userproof.phonne = phonne
            if (wsp is not None):
                userproof.wsp = wsp
            if (gender is not None):
                userproof.gender = gender
            db.session.commit()
            return {'User': '{} its modify now, rut={}'.format(userproof.name, userproof.rut)}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def return_all_filter_by(self, id_, rut, is_active, is_admin):
        conditions = []
        if id_ is not None:
            conditions.append(User.id == id_)
        if rut is not None:
            conditions.append(User.rut == rut)
        if is_active is not None:
            conditions.append(User.is_active == is_active)
        if is_admin is not None:
            conditions.append(User.is_admin == is_admin)
        try:
            def to_json(x):
                return {
                    'id': x.id,
                    'rut': x.rut,
                    'name': x.name,
                    'lastname': x.lastname,
                    'email': x.email,
                    'campus': x.campus,
                    'is_admin': x.is_admin,
                    'is_active': x.is_active,
                    'img_data': str(x.img_data),
                    'phonne': x.phonne,
                    'wsp': x.wsp,
                    'gender': x.gender
                }
            return ({'User': list(map(lambda x: to_json(x), User.query.filter(and_(*conditions))))})
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def find_by_rut(cls, rut):
        return cls.query.filter_by(rut=rut).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_campus(cls, campus):
        return cls.query.filter_by(campus=campus).first()

    # Para mostrar en comentarios
    @classmethod
    def return_name_for_id(self, id_):
        userproof = User.query.filter_by(id=id_).first()
        if (userproof is None):
            return errors_manager('This user does not exist'), 500
        try:
            return {
                'id': userproof.id,
                'name': userproof.name,
                'lastname': userproof.lastname,
                'img_data': userproof.img_data

            }
        except Exception as err:
            return errors_manager('poner mensaje', err), 500
