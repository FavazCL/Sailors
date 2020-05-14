/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  //Sailors Routes
  'GET /sailors': 'SailorsController.list',
  'GET /sailors/:rating': 'SailorsController.getByRating',
  'GET /sailors/byName/:name': 'SailorsController.getByName',
  'POST /sailors': 'SailorsController.create',
  'PATCH /sailors/:id': 'SailorsController.update',
  'DELETE /sailors/:id': 'SailorsController.delete',

  //Boats Routes
  'GET /boats': 'BoatsController.list',
  'GET /boats/:color': 'BoatsController.getByColor',
  'GET /boats/byName/:name': 'BoatsController.getByName',
  'POST /boats': 'BoatsController.create',
  'PATCH /boats/:id': 'BoatsController.update',
  'DELETE /boats/:id': 'BoatsController.delete',

  //Reserves Routes
  'GET /reserves': 'ReservesController.list',
  'GET /reserves/details': 'ReservesController.allDetails',
  'GET /reserves/:id': 'ReservesController.sailorDetails',
  'POST /reserves': 'ReservesController.create',
  'PATCH /reserves/:id': 'ReservesController.update',
  'DELETE /reserves/:id': 'ReservesController.delete',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
