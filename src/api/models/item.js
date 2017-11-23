var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
    itemId: {type: String, unique: true},
    category: String,
    brand: String,
    model: String,
    url: String,
    registeredPrices: [{
      fullname: String,
      price: Number,
      discount: Number,
    }]
});

module.exports = mongoose.model('Item', StoreSchema);
