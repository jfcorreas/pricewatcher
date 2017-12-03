const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    url: String
});

const StoreSchema   = new Schema({
    storeId: {type: String, unique: true},
    fullname: String,
    hostURL: String,
    port: {type: Number, default: 80},
    categories: [CategorySchema],
    itemRegex: String,
    priceRegex: String,
    discountRegex: String
});

module.exports = mongoose.model('Store', StoreSchema);
