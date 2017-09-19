const storesService = require('../services/stores-service');

exports.stores = function(req, res){
  res.send(storesService.liststores()).status(501).end();
};

exports.detail = function(req, res){
  res.send(storesService.getstore(req.params.id)).status(501).end();
};

exports.insert = function(req, res){
  res.send(storesService.savestore(req.body)).status(501).end();
};
