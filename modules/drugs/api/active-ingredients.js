module.exports = function(routeParams) {

    var route = new routeParams.SparqlRouteJSONLD;


    route.getContext = function() {
        return {
            "prefLabel" : {
                "@id" : "http://www.w3.org/2004/02/skos/core#prefLabel",
                "@language": "en"
            }
        }
    };

    route.getModel = function() {
        return {
            "@id" : ["string", ""],
            "prefLabel": ["string", ""]
        }
    };


    return route;

};