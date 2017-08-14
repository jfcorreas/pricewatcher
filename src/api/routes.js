var express   = require('express');

var router = express.Router();

// Middleware only for Development
/*router.use(function(req, res, next) {
  console.log(req.headers);
  next();
});*/

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/articles')
  .get(function(req, res){
    res.status(501).end();
  })
 module.exports = router;
