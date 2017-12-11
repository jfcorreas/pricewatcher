const StoresService = require('../services/stores-service')

exports.stores = function(req, res) {
  let result = StoresService.listStores()
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.detail = function(req, res){
  let result = StoresService.getStore(req.params.id);
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.insert = function(req, res){
  let result = StoresService.insertStore(req.body);
  result.then( function (value) {
    res.send(value).status(201).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.update = function(req, res){
  let result = StoresService.updateStore(req.params.id, req.body);
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.remove = function(req, res){
  let result = StoresService.removeStore(req.params.id);
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};
