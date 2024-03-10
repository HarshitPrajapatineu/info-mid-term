var bcrypt = require('bcrypt');
const responseBuilder = require('./response-builder');
const jwt = require('jsonwebtoken');
const { SecretKey } = require('../assets/config');


// Server-side blacklist of revoked tokens
blacklist = new Set();

// cryptPassword = function(password) {
//    bcrypt.genSalt(10, function(err, salt) {

//     bcrypt.hash(password, salt, function(err, hash) {
//       return hash;
//     });
//   });
// };

async function cryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10); // Using saltRounds = 10

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; // You might want to handle this error in a different way
  }
}

const comparePassword = async function (plainPass, hashword) {
  const res = await bcrypt.compare(plainPass, hashword)
  return res;
};




// Middleware to protect routes
const authenticateToken = function (req, res, next) {
  // Get token from request header

  // to bypass public/unprotected routes

  if (nonSecurePaths.includes(req.path)) return next();


  const token = req.headers['authorization'];

  // Check if token is provided
  if (!token) {
    return res.status(401).json(responseBuilder.RB({ message: 'Unauthorized Access!' }));
  }


  if (blacklist.has(token)) {
    return res.status(401).json({ message: 'Token revoked' });
  }

  // Verify token
  jwt.verify(token, SecretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

const nonSecurePaths =
  ['/',
    '/api/view/registration',
    '/api/view/login',
    // '/api/view/posteditor',
    // '/api/view/dashboard',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/user/register'
  ];


// function checkLogin (username, password) {
//     if(checkSession()) {
//         validateCreds(username, password)
//     }

// }

// function validateCreds(username, password) {

// }
// function checkSession() {
//     return true;
// }

module.exports =
{
  blacklist: blacklist,
  cryptPassword: cryptPassword,
  comparePassword: comparePassword,
  authenticateToken: authenticateToken
}