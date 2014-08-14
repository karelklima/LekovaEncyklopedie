module.exports = function(routeParams) {

    var _ = routeParams.Underscore;
    var route = new routeParams.SparqlRouteJSONLD;

    route.getContext = function() {
        return {
            "title": {
                "@id": "http://purl.org/dc/terms/title",
                "@language": "cs"
            },
            "prefLabel": {
                "@id": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "@language": "en"
            },
            "hasStrength": {
                "@id": "http://linked.opendata.cz/ontology/sukl/hasStrength",
                "@type": "http://www.w3.org/2001/XMLSchema#string"
            },
            "hasPackagingSize": {
                "@id": "http://linked.opendata.cz/ontology/sukl/hasPackagingSize",
                "@type": "http://www.w3.org/2001/XMLSchema#string"
            },

            "hasRouteOfAdministration": {
                "@id": "http://linked.opendata.cz/ontology/sukl/hasRouteOfAdministration",
                "@language": "cs"
            },
            "hasActiveIngredient": "http://linked.opendata.cz/ontology/sukl/hasActiveIngredient"
        }
    }

    route.prepareResponse = function(responseJSONLD) {

        var base;
        var objects = {};

        _.each(responseJSONLD["@graph"], function(object) {

            if (_.has(object, "hasRouteOfAdministration")) {
                base = object;
            } else {
                objects[object["@id"]] = object;
            }

        });

        base["hasActiveIngredient_tree"] = [];

        _.each(base["hasActiveIngredient"], function(id) {
            _.each(objects, function(obj, uri) {
                if (id == uri)
                    base["hasActiveIngredient_tree"].push(obj);
            });
        });


        console.log(base);
        console.log(objects);

        responseJSONLD["@graph"] = [base];

        return responseJSONLD;

    }

    route.getModel = function() {
        return {
            "title": ["string", ""],
            "hasStrength": ["string", ""],
            "hasPackagingSize": ["string", ""],
            "hasRouteOfAdministration": ["string", ""],
            "hasActiveIngredient": ["string", ""],
            "hasActiveIngredient_tree": ["object", []]
        }
    }

    return route;

}