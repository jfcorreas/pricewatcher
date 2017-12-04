const Item = require('../models/item');
const Store = require('../models/store');
const StoreWatcher = require('./parseStore-service');

const items = {

  listItems :function () {
    return new Promise(function (resolve, reject){
      Item.find(function(err, items) {
        if (err)
            reject(err);

        resolve(items);
        });
    });
  },

  insertItem : function (itemReq) {
    return new Promise(function (resolve, reject) {
      let item = createItem(itemReq);
      item.save(function(err) {
        if (err)
        reject(err);

        resolve('Item created!');
      });
    });
  },

  getItem : function (itemId) {
    return new Promise(function (resolve, reject) {
      Item.findOne({itemId: itemId}, function (err, item) {
        if (err)
          reject(err);

        resolve(item);
      });
    });
  },

  checkItemStores : function(itemId) {
    return new Promise(function (resolve, reject) {
      Item.findOne({itemId: itemId}, function (err, item) {
        if (err)
          reject(err);
        let promises = [];
        for (var link of item.links) {
          promises.push(getStorePrice(link));
        }
        Promise.all(promises)
          .then((results) => {
            resolve(results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  },

  updateItem : function (itemId, itemReq) {
    return new Promise(function (resolve, reject) {
      Item.findOneAndUpdate({itemId: itemId}, itemReq, function(err) {
        if (err)
          reject(err);

        resolve('Item updated!');
      });
    });
  },

  removeItem : function (itemId) {
    return new Promise(function (resolve, reject) {
      Item.remove({itemId: itemId}, function(err) {
        if (err)
          reject(err);

        resolve('Item succesfully deleted!');
      });
    });
  },

  addLink : function (itemId, itemReq) {
    return new Promise(function (resolve, reject) {
      Item.findOne({itemId: itemId}, function(err, item) {
        if (err)
          reject(err);
        const stores = [...new Set(item.links.map(a => a.store))];
        if (stores.includes(itemReq.store)){
          reject("This store already have a link");
        } else {
          item.links.push(itemReq);
          item.save(function(err){
            if (err)
              reject(err);
            resolve("Item link added succesfully");
          });
        }

      });
    });
  },

  removeLink : function (itemId, store) {
    return new Promise(function (resolve, reject) {
      Item.findOneAndUpdate({itemId: itemId},
            {'$pull': {'links':{ 'store': store}}},
            function (err, item) {
              if (err)
                reject(err);
              if (item){
                resolve("Item link removed succesfully");
              } else {
                reject("The item " + itemId + " does not exist");
              }
            }
      );
    });
  }
}

module.exports = items;

function createItem (itemReq) {
  let item = new Item();
  item.itemId = itemReq.itemId;
  item.category = itemReq.category;
  item.brand = itemReq.brand;
  item.model = itemReq.model;
  item.links = new Array();
  if (itemReq.links) {
    itemReq.links.forEach(function(linkReq) {
      let link = {};
      link.store = linkReq.store;
      link.urlPath = linkReq.urlPath;
    });
  }
  item.registeredPrices = new Array();
  if (itemReq.registeredPrices) {
    itemReq.registeredPrices.forEach(function(priceReq) {
      let price = {};
      price.store = priceReq.store;
      price.price = priceReq.price;
      price.discount = priceReq.discount;
      price.date = new Date(priceReq.date);
    });
  }

  return item;
}

function getStorePrice(link) {
  return new Promise((resolve, reject) => {
    Store.findOne({storeId: link.store}, function (err, store) {
      if (err)
        reject(err);
      if (store) {
        StoreWatcher.checkStore(link.urlPath, store, function(price, err){
          if (err)
           reject(err);
          resolve(price);
        });
      } else {
        reject("Store not found");
      }
    });
  });
}
