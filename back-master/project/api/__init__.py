from flask_restplus import Api

from project.api.ping import ping_namespace
from project.api.categories import add_category_namespace
from project.api.categories import delete_by_id_category_namespace, get_category_namespace
from project.api.communes import get_communes_namespace
from project.api.users import modify_user_namespace, change_to_admin_namespace, change_to_notadmin_namespace
from project.api.users import add_user_namespace, get_users_namespace, deactivate_user_namespace, activate_user_namespace
from project.api.evaluations import add_evaluation_namespace, get_evaluation_namespace
from project.api.notices import add_notice_namespace, change_states_notices_namespace, get_notice_namespace
from project.api.demands import add_demand_namespace, change_states_demand_namespace, get_demand_namespace

api = Api(version="1.0", title="API REST", doc="/doc/")

api.add_namespace(ping_namespace, path="/ping")

# Categories
api.add_namespace(add_category_namespace, path="/addCategory")
api.add_namespace(get_category_namespace, path="/getCategory")
api.add_namespace(delete_by_id_category_namespace, path="/deletebyidCategory/<id_>")

# Comunnes
api.add_namespace(get_communes_namespace, path="/getComunnes")

# Users
api.add_namespace(add_user_namespace, path="/addUser")
api.add_namespace(get_users_namespace, path="/getUsers")
api.add_namespace(deactivate_user_namespace, path="/desactivateforRut/<id_>")
api.add_namespace(activate_user_namespace, path="/activateforRut/<id_>")
api.add_namespace(modify_user_namespace, path="/modifyUser/<id_>")
api.add_namespace(change_to_admin_namespace, path="/changetoAdmin/<id_>")
api.add_namespace(change_to_notadmin_namespace, path="/changetoNotdmin/<id_>")

# Evaluations
api.add_namespace(add_evaluation_namespace, path="/addEval")
api.add_namespace(get_evaluation_namespace, path="/getEval")

# Notices
api.add_namespace(add_notice_namespace, path="/addNotice")
api.add_namespace(change_states_notices_namespace, path="/changestateNotice")
api.add_namespace(get_notice_namespace, path="/getNotice")

# Demand
api.add_namespace(add_demand_namespace, path="/addDemand")
api.add_namespace(change_states_demand_namespace, path="/changestateDemand")
api.add_namespace(get_demand_namespace, path="/getDemand")
