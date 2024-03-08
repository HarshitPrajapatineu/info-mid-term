var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var viewRouter = require('./routes/view-controller');
var postRouter = require('./routes/post-controller');
var usersRouter = require('./routes/user-controller');
var authRouter = require('./routes/auth-controller');
var bodyParser = require('body-parser');

var app = express();
var {db} = require('./serivces/database-service');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger-service');
const { authenticateToken } = require('./serivces/auth-service');

app.use(cors());

app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authenticateToken);

// Serve Swagger documentation
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);
app.use('/api/view', viewRouter);
app.use('/api/post', postRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
