var express   = require('express');

var itemsController = require('./controllers/item');

var router = express.Router();

// Middleware only for Development
/*router.use(function(req, res, next) {
  console.log(req.headers);
  next();
});*/

router.get('/', function(req, res) {
    res.json({ message: 'HURRA! welcome to our api!' });
});

router.route('/items').get(itemsController.items);

router.route('/items/:id').get(itemsController.detail);
router.route('/items/:id').put(itemsController.update);

 module.exports = router;
