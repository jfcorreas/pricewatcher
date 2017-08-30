const itemsService = require('../services/items-service');

exports.items = function(req, res){
  res.send(itemsService.listItems()).status(501).end();
};

exports.detail = function(req, res){
  res.send(itemsService.getItem(req.params.id)).status(501).end();
};

exports.insert = function(req, res){
  res.send(itemsService.saveItem(req.body)).status(501).end();
};

exports.update = function(req, res){
  res.send(itemsService.checkItem(req.params.id)).status(501).end();
};
