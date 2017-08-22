var express   = require('express');

var items = require('../backend/Items');

var router = express.Router();

// Middleware only for Development
/*router.use(function(req, res, next) {
  console.log(req.headers);
  next();
});*/

router.get('/', function(req, res) {
    res.json({ message: 'HURRA! welcome to our api!' });
});

router.route('/articles')
  .get(function(req, res){
    res.status(501).end();
  });

router.route('/articles/:id')
  .get(function(req, res){
    res.send(items.getItem(req.params.id,'eci')).status(200).end();
  })
  .put(function(req, res){
    res.send(items.checkItem(req.params.id,'eci')).status(200).end();
  });

 module.exports = router;
