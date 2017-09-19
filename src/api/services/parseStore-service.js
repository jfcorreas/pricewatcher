/*var http = require("http");
var fs = require("fs");
var he = require("he");
var proxy = (process.env.http_proxy)?true:false;

var options = {
  host: 'www.elcorteingles.es',
  port: 80,
  path: '/electronica/A21894100-tv-led-49-sony-kd-49xe8096-uhd-4k-hdr-smart-tv-android-60-wi-fi/',
  store: 'eci'
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
    console.log("Got error: " + e.message);
});

//fs.readFile('tv.html', 'utf-8', processFileContent);

function processHttpResponse(response) {
  console.log("Got response: " + response.statusCode);
  console.log(response.headers);
  var content = {};
  response.on('data', function(chunk) {
    content += chunk;
  })
  .on('end', function () {
    if (options.store === "eci") {
      parseElCorteIngles(content);
    } else {
      content.log("Store not found")
    }
  });
}

function processFileContent(err, content) {
  if (err) throw err;
  if (options.store === "eci") {
      parseElCorteIngles(content);
  } else {
      content.log("Store not found")
  }
}

// El Corte Ingles, ejemplos:
// Item    ----- <h2 class="title" itemprop="name">TV LED 49'' Samsung UE49KU6400 UHD 4K HDR, 1500 Hz PQI y Smart TV</h2>
// Price    ----- <span itemprop="price" content="849" class="hidden">849</span> -- El corte Inglés
// Discount ----- <span class="discount">-13%</span>
function parseElCorteIngles(content){
  var eci_item_regex = new RegExp('<h2 class="title" itemprop="name">(\.*?(?=</h2>))','gim');
  var eci_price_regex = new RegExp('<span itemprop="price"\.*?(?=>)\.(\.*?(?=</span>))','gim');
  var eci_discount_regex = new RegExp('<span class="discount">-(\.*?(?=%))','gim');

  var item = eci_item_regex.exec(content);
  var price = eci_price_regex.exec(content);
  var discount = eci_discount_regex.exec(content);

  if (item && price){
    console.log("Item: ", he.decode(item[1]));
    console.log("Price: ", parseInt(price[1].replace(/,/g , "")));
    if (discount){
      console.log("Discount: ", parseInt(discount[1]));
    }
  } else {
    console.log("Item Not Found");
  }
}
*/
