var express = require('express');
var userManager = require('../managers/user-manager');
var RS = require('../serivces/response-builder');
const { authenticateToken } = require('./auth-controller');
const auth = require('./auth-controller');
var router = express.Router();



/**
 * @openapi
 * /api/users/getAllUsers/:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: List of Users.
 */
router.get('/getAllUsers', function (req, res) {

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
router.post('/register', async function (req, res, next) {
  try {

    // console.log(req.body);
    const user = await userManager.addNewUser(req.body);
    // console.log(user);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(user));
  } catch (error) {
    console.log(error)
  }
});


/**
 * @openapi
 * /api/users/update/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/update', async function (req, res, next) {
  try {

    // console.log(req.body);
    const user = await userManager.updateUser(req.body, req.user);
    // console.log(user);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(user));
  } catch (error) {
    console.log(error)
  }
});


/**
 * @openapi
 * /api/users/delete/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/delete', async function (req, res, next) {
  try {

    // console.log(req.body);
    const user = await userManager.deleteUser(req.body.id, req.user);
    // console.log(user);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(user));
  } catch (error) {
    console.log(error)
  }
});


/**
 * @openapi
 * /api/users/follow/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/follow', async function (req, res, next) {
  try {

    // console.log(req.body);
    const user = await userManager.followUser(req.body.id, req.user.id);
    // console.log(user);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(user));
  } catch (error) {
    console.log(error)
  }
});


/**
 * @openapi
 * /api/users/unfollow/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/unfollow', async function (req, res, next) {
  try {

    // console.log(req.body);
    const user = await userManager.unfollowUser(req.body.id, req.user.id);
    // console.log(user);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(user));
  } catch (error) {
    console.log(error)
  }
});



/**
 * @openapi
 * /api/users/getUsers/:
 *   get:
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
router.post('/getUsers', async function (req, res) {

  const filter = req.body
  const user = req.user
  const users = await userManager.getfilteredUsers(filter, user.id);
  res.send(RS.RBData200OK(users));
});



/**
 * @openapi
 * /api/users/get/:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:x`
 *         description: List of Users.
 */
router.get('/get', async function (req, res) {

  const { id } = req.user
  const users = await userManager.getUserById(id);
  res.send(RS.RBData200OK(users));
});


/**
 * @openapi
 * /api/users/get/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:x`
 *         description: List of Users.
 */
router.post('/get', async function (req, res) {

  const { id } = req.body
  const users = await userManager.getUserById(id);
  res.send(RS.RBData200OK(users));
});

module.exports = router;
