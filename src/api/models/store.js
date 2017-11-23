var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StoreSchema   = new Schema({
    storeId: {type: String, unique: true},
    fullname: String,
    hostURL: String,
    port: {type: Number, default: 80},
    categories: [{
      name: String,
      url: String
    }],
    itemRegex: String,
    priceRegex: String,
    discountRegex: String
});

module.exports = mongoose.model('Store', StoreSchema);
