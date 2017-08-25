const itemsService = require('../services/items-service');

exports.items = function(req, res){
  res.send(itemsService.listItems()).status(501).end();
};

exports.detail = function(req, res){
  res.send(itemsService.getItem(req.params.id,'eci')).status(501).end();
};

exports.update = function(req, res){
  res.send(itemsService.checkItem(req.params.id,'eci')).status(501).end();
};
