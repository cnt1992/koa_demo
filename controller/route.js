/**
 * Module dependencies.
 */
var render = require('./render');
var route = require('koa-route');
var parse = require('co-body');
var views = require('co-views');
var app = require('koa')();

module.exports = function (app) {
	/**
	 * route definitions
	 */
	var routes = {
		index : function *() {
			this.body = yield render('page/index');
		}
	};

	//routes
	app.use(route.get('/',routes.index));

}
