let Item = require('../models/item');

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

  checkItem : function(itemId) {
    return ("TODO: check item with Id=" + itemId + " info in items and update in database ");
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
      link.url = linkReq.url;
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
