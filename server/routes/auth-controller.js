var auth = require('../serivces/auth-service');

var express = require('express');
var userManager = require('../managers/user-manager');
var RS = require('../serivces/response-builder');
const userSchema = require('../schemas/user-schema');
const jwt = require('jsonwebtoken');
const { SecretKey } = require('../assets/config');
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
 router.post('/login', async function (req, res) {

    const { email, password } = req.body;

    // Find user by username
    const user = await userSchema.findUserByEmail(email);

    // If user not found or password is incorrect, return error
    const isPasswordMatch = await auth.comparePassword(password, user.password);
    if (!user || !isPasswordMatch) {
        return res.status(401).send(
            RS.RBData401Unauthorized(null)
        );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, lastname: user.lastname, role: user.userrole }, SecretKey, { expiresIn: '1h' });

    const sessionData = {
        token: token,
        userId: user._id,
        lastname: user.lastname,
        userrole: user.userrole,
        email: user.email
    }

    res.send(RS.RBData200OK(sessionData));
});

/**
 * @openapi
 * /api/auth/logout/:
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
 *         description: log out.
 */
router.get('/logout', function (req, res) {

    const token = req.headers['authorization'];
    if (token) {
        auth.blacklist.add(token);
    }
    const data = { message: 'Logout successful' }
    res.send(RS.RBData200OK(data));
});


module.exports = router;

// module.exports = {
//     authenticateToken: authenticateToken
// };
