var express = require('express');
var userManager = require('../managers/user-manager');
var RS = require('../serivces/response-builder');
var router = express.Router();


var bodyParser = require('body-parser')

/**
 * @openapi
 * /api/users/get/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     requestBody: {
 *       content: {
 *         "application/json": {
 *           schema: {
 * $ref: "./schema.json"
 * }
 *              
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
 * /api/users/register/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/register', function (req, res, next) {
  try {

    console.log(req.body);
    userManager.addNewUser(req.body);
    res.send('respond with a resource');
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
