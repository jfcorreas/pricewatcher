const storesService = require('../services/stores-service');

exports.stores = function(req, res){
  res.send(storesService.liststores()).status(501).end();
};

exports.detail = function(req, res){
  res.send(storesService.getstore(req.params.id)).status(501).end();
};

exports.insert = function(req, res){
  let result = storesService.savestore(req.body);
  result.then( function (value) {
    console.log('BIEEN: ' + value);
    res.send(value).status(201).end();
  }, function (reason) {
    console.log('OOOOOH: ' + reason);
    res.send(reason).status(400).end();
  });
};
