var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user-controller');

var app = express();
var {db} = require('./serivces/database-service');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger-service');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve Swagger documentation
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api', indexRouter);

app.use('/api/users', usersRouter);



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
