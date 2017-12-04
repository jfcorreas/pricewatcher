const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    url: String
});

const StoreSchema   = new Schema({
    storeId: {type: String, unique: true},
    fullname: {type: String, required: true},
    hostURL: {type: String, required: true},
    port: {type: Number, default: 80},
    categories: [CategorySchema],
    itemRegex: {type: String, required: true},
    priceRegex: {type: String, required: true},
    discountRegex: String
});

module.exports = mongoose.model('Store', StoreSchema);
