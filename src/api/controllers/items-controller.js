const ItemsService = require('../services/items-service');

exports.items = function(req, res){
  let result = ItemsService.listItems();
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.detail = function(req, res){
  let result = ItemsService.getItem(req.params.id);
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });};

exports.insert = function(req, res){
  let result = ItemsService.insertItem(req.body);
  result.then( function (value) {
    res.send(value).status(201).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.update = function(req, res){
  res.send(ItemsService.checkItem(req.params.id)).status(501).end();
};
