var express   = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var router = require('./routes');

var port = process.env.port || 8080;
var mode = process.env.NODE_ENV || 'debug';

var api       = express();

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
