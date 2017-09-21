const express   = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const mongoose = require('mongoose');

const router = require('./routes');

const port = process.env.port || 8080;
const mode = process.env.NODE_ENV || 'debug';

const config = require('./config')[mode];

const api       = express();

mongoose.connection.on("connected", function(ref){
  console.log('Mongoose connected to: ' + config.mongodbURI);

  api.use(bodyParser.urlencoded({extended: true}));
  api.use(bodyParser.json());
  api.use(methodOverride());
  api.use(express.static(__dirname + '/public'));
  api.use(logErrors);
  api.use(clientErrorHandler);
  api.use(errorHandler);

  api.use('/api/v1', router);

  // Redirect all unmatched GET requests
  api.get('*', function(req,res) {
    res.redirect('/api/v1');
  });

  api.listen(port);
  console.log('API working on ' + mode + ' mode');
  console.log('Watch the prices on port '+ port);

});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.error('Failed to connect to DB: ' + config.mongodbURI + ' on startup ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection to DB: ' + mode + ' disconnected');
});

var gracefulExit = function() {
  mongoose.connection.close(function () {
    console.log('Mongoose connection with DB: ' + mode + ' is disconnected through app termination');
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

try {
  mongoose.connect(config.mongodbURI, config.mongodbOptions);
  console.log('Trying to connect to DB...');
} catch (err) {
  console.log("Sever initialization failed " , err.message);
}

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
