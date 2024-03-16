var express = require('express');
var router = express.Router();
const fs = require('fs');
const responseBuilder = require('../serivces/response-builder');
const path = require('path');
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
router.get('/:path', function (req, res, next) {
  let data = null;
  const isAdmin = req?.user?.role === "admin";

  try {
    fs.readFile((isAdmin ? getAdminPath(req.params.path) : './views/') + req.params.path + '.json', 'utf8', (err, file) => {
      // check for any errors
      if (err) {
        console.error('Error while reading the file:', err)
        return
      }
      data = JSON.parse(file)
      // output the parsed data
      // // console.log("sssssss"+ data)
      res.send(responseBuilder.RBDesign200OK(data.design));
    })
  } catch (err) {
    console.error('Error while parsing JSON data:', err)
  }
});


const getAdminPath = (path) => {
  const pathlist = [
    "userroster",
    "dashboard",
    "usereditor"
  ]
  if (pathlist.includes(path)) {
    // if (path === "userroster" || path === "dashboard") {
    return "./views/admin/";
  }
  else {
    return "./views/";
  }
}

module.exports = router; 
