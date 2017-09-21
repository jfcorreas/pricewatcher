var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StoreSchema   = new Schema({
    fullname: String,
    storeId: String,
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
