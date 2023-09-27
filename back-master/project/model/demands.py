from project import db, errors_manager
from datetime import datetime
from project.model.users import User
from project.model.states import Statesdemand
from project.model.notices import Notice


class Demand(db.Model):
    __tablename__ = 'demands'

    id = db.Column(db.Integer, primary_key=True)
    contact_preference = db.Column(db.String(), nullable=False)
    demand_date = db.Column(db.DateTime, default=datetime.utcnow())
    id_notice = db.Column(db.Integer, db.ForeignKey('notices.id'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    id_statedemand = db.Column(db.Integer, db.ForeignKey('statesdemands.id'), nullable=False, default=1)

    def __init__(self, contact_preference, demand_date, id_notice, id_user, id_statedemand):
        self.contact_preference = contact_preference
        self.demand_date = demand_date
        self.id_notice = id_notice
        self.id_user = id_user
        self.id_statedemand = id_statedemand

    # Se guarda en la base de datos
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    @classmethod
    def change_states(self, id_demand, canceled):
        demandproof = Demand.query.filter_by(id=id_demand).first()
        if (demandproof is None):
            return errors_manager('This demand does not exist'), 500

        stateproof1 = Statesdemand.query.filter_by(id=demandproof.id_statedemand).first()

        try:
            # De disponible a reservado o de reservado a entregado
            if (stateproof1.id in [1, 2] and canceled is None):
                demandproof.id_statedemand = demandproof.id_statedemand + 1

            # Cancelado
            if (canceled is not None):
                demandproof.id_statedemand = 4

            demandproof.demand_date = datetime.utcnow()
            stateproof2 = Statesdemand.query.filter_by(id=demandproof.id_statedemand).first()
            db.session.commit()
            return {'Demand': '{} change to state {}'.format(demandproof.id, stateproof2.value)}

        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def get_first(self):
        demand1 = Demand.query.filter_by(id_statedemand=1).all()
        if (demand1 is not None):
            demand2 = Demand.query.filter_by(id_statedemand=2).all()
            if (demand2 == []):
                demandproof = demand1[0]
                demandproof.id_statedemand = 2

        if (demandproof is None):
            return errors_manager('This demand does not exist'), 500
        stateproof = Statesdemand.query.filter_by(id=demandproof.id_statedemand).first()
        userproof = User.query.filter_by(id=demandproof.id_user).first()
        noticeproof = Notice.query.filter_by(id=demandproof.id_notice).first()
        if (demandproof.contact_preference == 'email'):
            data_preference = userproof.email
        if (demandproof.contact_preference == 'phonne'):
            data_preference = userproof.phonne
        if (demandproof.contact_preference == 'wsp'):
            data_preference = userproof.wsp

        try:
            return {
                'id': demandproof.id,
                'id_user': userproof.id,
                'name_user': userproof.name,
                'contact_preference': demandproof.contact_preference,
                'data_preference': data_preference,
                'statevalue': stateproof.value,
                'notice_id': noticeproof.id,
                'notice_title': noticeproof.title,
                'demand_date': demandproof.demand_date.isoformat()
            }
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def get_for_id(self, id_):
        demandproof = Demand.query.filter_by(id=id_).first()
        if (demandproof is None):
            return errors_manager('This demand does not exist'), 500

        stateproof = Statesdemand.query.filter_by(id=demandproof.id_statedemand).first()
        userproof = User.query.filter_by(id=demandproof.id_user).first()
        noticeproof = Notice.query.filter_by(id=demandproof.id_notice).first()
        if (demandproof.contact_preference == 'mail'):
            data_preference = userproof.email
        if (demandproof.contact_preference == 'phone'):
            data_preference = userproof.phonne
        if (demandproof.contact_preference == 'wsp'):
            data_preference = userproof.wsp

        try:
            return {
                'id': demandproof.id,
                'id_user': userproof.id,
                'name_user': userproof.name,
                'contact_preference': demandproof.contact_preference,
                'data_preference': data_preference,
                'statevalue': stateproof.value,
                'notice_id': noticeproof.id,
                'notice_title': noticeproof.title,
                'demand_date': demandproof.demand_date.isoformat()
            }
        except Exception as err:
            return errors_manager('poner mensaje', err), 500

    @classmethod
    def get_waitlist(self, get_wait):
        demandproof = Demand.query.filter_by(id_notice=get_wait).all()
        if (demandproof == []):
            return errors_manager('This demand does not exist'), 500
        if (demandproof != []):

            try:
                def to_json(x):
                    stateproof = Statesdemand.filter_by_id(x.id_statedemand)
                    userproof = User.find_by_id(x.id_user)
                    noticeproof = Notice.filter_by_id(x.id_notice)
                    if (x.contact_preference == 'email'):
                        data_preference = userproof.email
                    if (x.contact_preference == 'phonne'):
                        data_preference = userproof.phonne
                    if (x.contact_preference == 'wsp'):
                        data_preference = userproof.wsp
                    return {
                        'id': x.id,
                        'id_user': userproof.id,
                        'name_user': userproof.name,
                        'contact_preference': x.contact_preference,
                        'data_preference': data_preference,
                        'statevalue': stateproof.value,
                        'notice_id': noticeproof.id,
                        'notice_title': noticeproof.title,
                        'demand_date': x.demand_date.isoformat()
                    }
                return {'Demands': list(map(lambda x: to_json(x), demandproof))}
            except Exception as err:
                return errors_manager('poner mensaje', err), 500
