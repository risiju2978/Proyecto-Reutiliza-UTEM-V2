
from flask import request
from flask_restplus import Namespace, Resource
from project.model.notices import Notice
from project.model.demands import Demand
from project import errors_manager

change_states_demand_namespace = Namespace("change_states_demand")
add_demand_namespace = Namespace("add_demand")
get_demand_namespace = Namespace("get_demand")


class change_states_demand(Resource):
    def post(self):
        body = request.json
        id_demand = body.get('id_demand')
        canceled = body.get('canceled')

        return Demand.change_states(id_demand, canceled)


# Se agrega notice por body
class add_demand(Resource):
    def post(self):
        body = request.json
        contact_preference = body.get('contact_preference')
        demand_date = body.get('demand_date')
        id_notice = body.get('id_notice')
        id_user = body.get('id_user')
        id_statedemand = body.get('id_statedemand')
        notice = Notice.filter_by_id(id_notice)

        try:
            demand = Demand(
                contact_preference=contact_preference,
                demand_date=demand_date,
                id_notice=id_notice,
                id_user=id_user,
                id_statedemand=id_statedemand
            )

            demand.save_to_db()

            return {'message': 'Demand {} added, id={}'.format(notice.title, demand.id)}
        except Exception as err:
            return errors_manager('poner mensaje', err), 500


class get_demand(Resource):
    def get(self):
        id_demand = request.args.get('id_demand')
        get_wait_notice = request.args.get('get_wait_notice')  # Con id de notice
        get_first = request.args.get('get_first')
        try:
            if (id_demand is not None):
                return Demand.get_for_id(id_demand)
            if (get_wait_notice is not None):
                return Demand.get_waitlist(get_wait_notice)
            if (get_first is not None):
                return Demand.get_first()
        except Exception as err:
            return errors_manager('poner mensaje', err), 500


add_demand_namespace.add_resource(add_demand, "")
change_states_demand_namespace.add_resource(change_states_demand, "")
get_demand_namespace.add_resource(get_demand, "")
