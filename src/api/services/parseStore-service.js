const http = require("http");
//const fs = require("fs");
const he = require("he");
const proxy = (process.env.http_proxy)?true:false;
const mode = process.env.NODE_ENV || 'debug';

exports.checkStore = function (urlPath, store, callback) {
  const options = {
    host: store.hostURL,
    port: store.port || 80,
    path: urlPath
  };

  if (proxy){
    let originalHost = options.host;
    options.host = 'proxy.hhellin.es';
    options.port = 8081;
    options.path = 'http://' + originalHost + options.path;
  }
console.log(options);
  http.get(options, processHttpResponse)
    .on('error', function(e) {
      callback(undefined, "Got error: " + e.message);
    });

  //fs.readFile('tv.html', 'utf-8', processFileContent);
  function processHttpResponse(response) {
    if (mode === 'debug'){
      console.log("Got response: " + response.statusCode);
      console.log(response.headers);
    }
    let content = {};
    response.on('data', function(chunk) {
      content += chunk;
    })
    .on('end', () => { parseStore(store ,content, callback) });
  }

/*  function processFileContent(err, content) {
    if (err) throw err;
    parseStore(store, content);
  }
*/
}

function parseStore(store, content, callback){
  //var eci_item_regex = new RegExp('<h2 class="title" itemprop="name">(\.*?(?=</h2>))','gim');
  //var eci_price_regex = new RegExp('<span itemprop="price"\.*?(?=>)\.(\.*?(?=</span>))','gim');
  //var eci_discount_regex = new RegExp('<span class="discount">-(\.*?(?=%))','gim');

  //let item_regex = new RegExp(store.itemRegex,'gim');
  let price_regex = new RegExp(store.priceRegex,'gim');

  //let item = item_regex.exec(content);
  let price = price_regex.exec(content);
  let discount;

  if (store.discountRegex) {
    let discount_regex = new RegExp(store.discountRegex,'gim');
    discount = discount_regex.exec(content);
  }

  if (price){
    console.log(price_regex);
    let newPrice = {
      store: store.storeId,
      price: parseInt(price[1].replace(/,/g , ""))
    }
    //let msg = "Item: " + he.decode(item[1]);
    if (discount){
      newPrice[discount] = parseInt(discount[1]);
    }
    callback(newPrice, undefined);
  } else {
    callback(undefined, "Error parsing item's price");
  }
}
