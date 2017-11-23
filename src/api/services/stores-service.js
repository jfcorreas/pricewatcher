let Store     = require('../models/store');

const stores = {

  listStores :function () {
    return new Promise(function (resolve, reject){
      Store.find(function(err, stores) {
        if (err)
            reject(err);

        resolve(stores);
        });
    });
  },

  insertStore : function (storeReq) {
    return new Promise(function (resolve, reject) {
      let store = createStore(storeReq);
      store.save(function(err) {
        if (err)
          reject(err);

        resolve('Store created!');
      });
    });
  },

  getStore : function (storeId) {
    return new Promise(function (resolve, reject) {
      Store.findOne({storeId: storeId}, function (err, store) {
        if (err)
          reject(err);

        resolve(store);
      });
    });
  },

  updateStore : function (storeId, storeReq) {
    return new Promise(function (resolve, reject) {
      Store.findOneAndUpdate({storeId: storeId}, storeReq, function(err) {
        if (err)
          reject(err);

        resolve('Store updated!');
      });
    });
  },

  removeStore : function (storeId) {
    return new Promise(function (resolve, reject) {
      Store.remove({storeId: storeId}, function(err) {
        if (err)
          reject(err);

        resolve('Store succesfully deleted!');
      });
    });
  }
}

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
