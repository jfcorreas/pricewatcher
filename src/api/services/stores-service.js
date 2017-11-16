let Store     = require('../models/store');

const stores = {

  liststores :function () {
    return new Promise(function (resolve, reject){
      Store.find(function(err, stores) {
        if (err)
            reject(err);

        resolve(stores);
        });
    });
  },

  savestore : function (storeReq) {
    return new Promise(function (resolve, reject) {
      let store = createStore(storeReq);
      store.save(function(err) {
        if (err)
          reject(err);

        resolve('Store created!');
      });
    });
  },

  getstore : function (storeId) {
    return new Promise(function (resolve, reject) {
      Store.findOne({storeId: 'eci'}, function (err, store) {
        if (err)
          reject(err);

        resolve(store);
      });
    });
  },

  updatestore : function (storeId, storeReq) {
    return new Promise(function (resolve, reject) {
      //let update = { $set: {fullname: storeReq.fullname}}
      Store.findByIdAndUpdate(storeId, storeReq, function(err) {
        if (err)
          reject(err);

        resolve('Store updated!');
      });
    });
  },
}

/*Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });*/

module.exports = stores;

function createStore (storeReq) {
  let store = new Store();
  store.fullname = storeReq.fullname;
  store.storeId = storeReq.storeId;
  store.hostURL = storeReq.hostURL;
  store.port = storeReq.port;
  store.categories = new Array();
  if (storeReq.categories) {
    storeReq.categories.forEach(function(categoryReq){
      let category = {};
      category.name = categoryReq.name;
      category.url = categoryReq.url;
      store.categories.push(category)
    });
  }
  store.itemRegex = storeReq.itemRegex;
  store.priceRegex = storeReq.priceRegex;
  store.discountRegex = storeReq.discountRegex;

  return store;
}
