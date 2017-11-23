var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
    itemId: {type: String, unique: true},
    category: String,
    brand: String,
    model: String,
    links: [{
      store: String,
      url: String
    }],
    registeredPrices: [{
      store: String,
      price: Number,
      discount: Number,
      date: {type: Date, default: new Date()}
    }]
});

module.exports = mongoose.model('Item', ItemSchema);
