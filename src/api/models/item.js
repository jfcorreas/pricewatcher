const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

let LinkSchema = new Schema({
  store: String,
  urlPath: String
});

let PriceSchema = new Schema({
  store: String,
  price: Number,
  discount: Number,
  timestamp: {type: Date, default: new Date()}
});

let ItemSchema   = new Schema({
    itemId: {type: String, unique: true},
    category: String,
    brand: String,
    model: String,
    links: [LinkSchema],
    registeredPrices: [PriceSchema]
});


module.exports = mongoose.model('Item', ItemSchema);
