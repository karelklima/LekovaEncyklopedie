/**
 * Linked Data Application Framework
 * Node.js web server
 */

var express = require('express');
var http = require('http');
var _ = require('underscore');
var api_router = require('./lib/api-router');
var options = require('./options');

var DEFAULT_PORT = 8000;


var app = express();

_.each(options["api-modules"], function(moduleName) {
    app.use('/' + moduleName + '/api', api_router(moduleName, options));
    app.use('/' + moduleName + '/miniapps', express.static(__dirname + '/../modules/' + moduleName + '/miniapps'));
    app.use('/' + moduleName + '/shared', express.static(__dirname + '/../modules/' + moduleName + '/shared'));
});

app.use(express.static(__dirname + '/../app'));

app.listen(DEFAULT_PORT);

