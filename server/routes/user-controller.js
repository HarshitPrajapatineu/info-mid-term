var express = require('express');
var userManager = require('../managers/user-manager')
var RS = require('../serivces/response-builder')
var router = express.Router();


/**
 * @openapi
 * /api/users/get/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody: {
 *       content: {
 *         "application/json": {
 *           schema: {
 *           }
 *         }
 *       }
 *      }
 *     responses:
 *       200:
 *         description: List of Users.
 */
router.get('/', function (req, res, next) {

  const users = userManager.getAllUsers();
  res.send(RS.RBData200OK(users));
});


/**
 * @openapi
 * /api/users/add/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/add', function (req, res, next) {
  
  userManager.addNewUser('abc', 'abc', '12345', Date.UTC());
  res.send('respond with a resource');
});

module.exports = router;
