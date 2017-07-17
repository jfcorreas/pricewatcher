var express   = require('express');
var bodyParser = require('body-parser');

var router = require('./routes');

var api       = express();

api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());

var port = process.env.port || 8080;

api.use('/api', router);

api.listen(port);
console.log('Watch the prices on port '+ port);
