const express   = require('express');

const itemsController = require('./controllers/items-controller');
const storesController = require('./controllers/stores-controller');

const router = express.Router();

const mode = process.env.NODE_ENV || 'debug';

// Middleware only for Development
if (mode === 'debug'){
  router.use(function(req, res, next) {
    console.log(req.headers);
    console.log(req.body);
    next();
  });
}

router.get('/', function(req, res) {
    res.json({ message: 'HURRA! welcome to our api!' });
});

router.route('/items').get(itemsController.items);
router.route('/items/:id').get(itemsController.detail);
router.route('/items').post(itemsController.insert);
router.route('/items/:id').put(itemsController.update);

router.route('/stores').get(storesController.stores);
router.route('/stores/:id').get(storesController.detail);
router.route('/stores').post(storesController.insert);
router.route('/stores/:id').put(storesController.update);
router.route('/stores/:id').delete(storesController.remove);

module.exports = router;
