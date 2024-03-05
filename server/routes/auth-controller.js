var auth = require('../serivces/auth-service');

var express = require('express');
var userManager = require('../managers/user-manager');
var RS = require('../serivces/response-builder');
const userSchema = require('../schemas/user-schema');
var router = express.Router();



/**
 * @openapi
 * /api/auth/login/:
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
 *         description: Login API returns token.
 */
router.post('/login', function (req, res) {

    const { email, password } = req.body;

    // Find user by username
    const user = userSchema.findUserByEmail(email);

    // If user not found or password is incorrect, return error
    if (!user || !auth.comparePassword(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

    res.send(RS.RBData200OK(token));
});


module.exports = router;

// module.exports = {
//     authenticateToken: authenticateToken
// };
