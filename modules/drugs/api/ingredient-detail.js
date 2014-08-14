module.exports = function(routeParams) {

    var _ = routeParams.Underscore;
    var route = new routeParams.SparqlRouteJSONLD;

    route.getContext = function() {
        return {
            "prefLabel": {
                "@id": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "@language": "en"
            },
            "CI_with": "http://linked.opendata.cz/ontology/ndfrt/CI_with",
            "may_treat": "http://linked.opendata.cz/ontology/ndfrt/may_treat"
        }
    };

    route.prepareResponse = function(responseJSONLD) {

        var base;
        var objects = {};

        _.each(responseJSONLD["@graph"], function(object) {

            if (_.has(object, "CI_with")) {
                base = object;
            } else {
                objects[object["@id"]] = object;
            }

        });

        base["CI_with_tree"] = [];

        _.each(base["CI_with"], function(id) {
            _.each(objects, function(obj, uri) {
                if (id == uri)
                    base["CI_with_tree"].push(obj);
            });
        });

        base["may_treat_tree"] = [];

        _.each(base["may_treat"], function(id) {
            _.each(objects, function(obj, uri) {
                if (id == uri)
                    base["may_treat_tree"].push(obj);
            });
        });

        console.log(base);
        console.log(objects);

        responseJSONLD["@graph"] = [base];

        return responseJSONLD;

    };

    route.getModel = function() {
        return {
            "@id": ["string", ""],
            "prefLabel": ["string", ""],
            "CI_with_tree": ["object", {}],
            "may_treat_tree": ["object", {}]
        }
    };

    return route;

};