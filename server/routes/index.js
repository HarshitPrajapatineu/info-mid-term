var express = require('express');
var router = express.Router();
const fs = require('fs');
const responseBuilder = require('../serivces/response-builder');
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', function (req, res, next) {
  res.send('Node works!');
});

/**
 * @openapi
 * /views/login:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/view/:path', function (req, res, next) {

  let data = null
  fs.readFile('./views/' + req.params.path + '.json', 'utf8', (err, file) => {
    // check for any errors
    if (err) {
      console.error('Error while reading the file:', err)
      return
    }
    try {
      data = JSON.parse(file)
      // output the parsed data
      // console.log("sssssss"+ data)
      res.send(responseBuilder.RBDesign200OK(data.design));
    } catch (err) {
      console.error('Error while parsing JSON data:', err)
    }
  })
});

module.exports = router; 
