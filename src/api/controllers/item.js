var items = require('../../backend/Items');

exports.items = function(req, res){
  res.status(501).end();
};

exports.detail = function(req, res){
  res.send(items.getItem(req.params.id,'eci')).status(200).end();
};

exports.update = function(req, res){
  res.send(items.checkItem(req.params.id,'eci')).status(200).end();
};
