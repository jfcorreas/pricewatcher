let Store     = require('../models/store');

const stores = {
  liststores :function () {
    return ("TODO: list all stores in database");
  },

  savestore : function (storeReq) {
    return new Promise(function (resolve, reject) {
      let store = fillStore(storeReq);
      store.save(function(err) {
        console.log('Store saving...');
        if (err)
          reject(err);

        resolve('Store created!');
      });
    });
  },

  getstore : function (storeId) {
    return ("TODO: get store " + storeId + " info from database ");
  }
}

module.exports = stores;

function fillStore (storeReq) {
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
