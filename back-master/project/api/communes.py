from flask import request
from flask_restplus import Namespace, Resource
from project.model.communes import Commune

get_communes_namespace = Namespace("get_communes")

# Se listan comunas y regiones por filtro Query Params


class get_communes(Resource):
    def get(self):
        allcommunes = request.args.get('allcommunes')
        allregions = request.args.get('allregions')
        communesforRegion = request.args.get('communesforRegion')
        allforname = request.args.get('allforname')

        if (allcommunes is not None):
            return Commune.return_all_communes()
        if (allregions is not None):
            return Commune.return_all_region()
        if (communesforRegion is not None):
            return Commune.get_for_region(communesforRegion)
        if (allforname is not None):
            return Commune.find_all_for_name(allforname)


get_communes_namespace.add_resource(get_communes, "")
