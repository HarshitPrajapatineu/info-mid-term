var express = require('express');
var postManager = require('../managers/post-manager');
var RS = require('../serivces/response-builder');
const { authenticateToken } = require('./auth-controller');
const auth = require('./auth-controller');
var router = express.Router();



/**
 * @openapi
 * /api/post/get/:
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
 *         description: List of Posts.
 */
router.get('/getAllPosts', async function (req, res) {

  const posts = await postManager.getAllPosts();
  res.send(RS.RBData200OK(posts));
});

/**
 * @openapi
 * /api/post/getFeedData:
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
 *         description: List of Posts Based on user session.
 */
router.post('/getFeedData', async function (req, res) {

  const userId = req.user.id;
  const posts = await postManager.getPostsForFeed(userId);
  res.send(RS.RBData200OK(posts));
});

/**
 * @openapi
 * /api/post/getUserPosts:
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
 *         description: List of Posts Based on user session.
 */
router.get('/getUserPosts', async function (req, res) {

  const userId = req.user.id;
  const posts = await postManager.getPostsForUser(userId);
  res.send(RS.RBData200OK(posts));
});

/**
 * @openapi
 * /api/post/getUserPosts:
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
 *         description: List of Posts Based on user session.
 */
router.post('/get', async function (req, res) {

  const { id } = req.body;
  const userId = req.user.id;
  const posts = await postManager.getPost(id);
  res.send(RS.RBData200OK(posts));
});



/**
 * @openapi
 * /api/post/save/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/save', async function (req, res, next) {
  try {

    // console.log(req.body);
    const post = await postManager.addNewPost(req.body, req.user);
    // console.log(req.user);
    // console.log(post);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(post));
  } catch (error) {
    console.log(error)
  }
});


/**
 * @openapi
 * /api/post/save/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/updateLike', async function (req, res, next) {
  try {

    const post = await postManager.updateLike(req.body, req.user);
    // console.log(post);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(post));
  } catch (error) {
    console.log(error)
  }
});


/**
 * @openapi
 * /api/post/update/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/update', async function (req, res, next) {
  try {

    const post = await postManager.updatePost(req.body, req.user);
    // console.log(post);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(post));
  } catch (error) {
    console.log(error)
  }
});


/**
 * @openapi
 * /api/post/delete/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/delete', async function (req, res, next) {
  try {
    const { id } = req.body;
    const post = await postManager.deletePost(id, req.user);
    // console.log(post);
    // res.redirect("/api/view/login");
    res.send(RS.RBData200OK(post));
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
