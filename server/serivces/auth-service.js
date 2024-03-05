var bcrypt = require('bcrypt');
const responseBuilder = require('./response-builder');

exports.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

exports.comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};


// Middleware to protect routes
exports.authenticateToken = function(req, res, next) {
  // Get token from request header

  // to bypass public/unprotected routes
  const nonSecurePaths = 
  ['/', 
  '/api/view/registration',
  '/api/view/login',
   '/contact'
  ];
  if (nonSecurePaths.includes(req.path)) return next();

  
  const token = req.headers['authorization'];

  // Check if token is provided
  if (!token) {
      return res.status(401).json( responseBuilder.RB({ message: 'Unauthorized Access!' }));
  }

  // Verify token
  jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
  });
}


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