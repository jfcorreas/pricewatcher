const storesService = require('../services/stores-service');

exports.stores = function(req, res){
  let result = storesService.liststores();
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.detail = function(req, res){
  let result = storesService.getstore(req.params.id);
  result.then( function (value) {
    res.send(value).status(200).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};

exports.insert = function(req, res){
  let result = storesService.savestore(req.body);
  result.then( function (value) {
    res.send(value).status(201).end();
  }, function (reason) {
    res.send(reason).status(400).end();
  });
};
