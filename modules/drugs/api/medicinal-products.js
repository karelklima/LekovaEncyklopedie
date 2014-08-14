module.exports = function(routeParams) {

    var route = new routeParams.SparqlRouteJSONLD;

    route.getContext = function() {
        return {
            "hasPackagingSize": {
                "@id" : "http://linked.opendata.cz/ontology/sukl/hasPackagingSize",
                "@type": "http://www.w3.org/2001/XMLSchema#string"
            },
            "title": {
                "@id": "http://purl.org/dc/terms/title",
                "@language": "cs"

            }

        }
    }

    route.getModel = function() {
        return {
            "@id": ["string", ""],
            "title": ["string", ""],
            "hasPackagingSize": ["string", ""]
        }
    }

    return route;

};