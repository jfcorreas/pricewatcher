<template>
  <div class="items">
    <ul>
      <li v-for="item in items.slice(items.length - 10, items.length)">
        <div class="item">

          <div class="content">
            <a class="header">{{item.itemId}}</a>
            <div class="meta">
              <span class="cinema">{{item.registeredPrices[0].price}}</span>
            </div>
            <div class="description">
              <p></p>
            </div>
            <div class="extra">
              <div class="ui label">{{item.registeredPrices[0].timestamp}}</div>
              <div class="ui label"><i class="globe icon"></i>{{item.registeredPrices[0].timestamp}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PriceWatcher',
  data () {
    return {
      items: [],
      errors: []
      /*
      {
          "_id": "5a2dad987acdfb1332de865a",
          "model": "MU7005",
          "brand": "Samsung",
          "category": "Televisiones",
          "itemId": "tv-samsung-mu7005",
          "__v": 2,
          "registeredPrices": [
              {
                  "store": "eci",
                  "price": 999,
                  "_id": "5a2daf1ac0e3a61473641d2f",
                  "timestamp": "2017-12-10T22:02:43.963Z"
              }
          ],
          "links": [
              {
                  "store": "eci",
                  "urlPath": "/electronica/A22151758-tv-led-12446-cm-49-samsung-ue49mu7005-uhd-4k-hdr-1000-smart-tv-wi-fi/",
                  "_id": "5a2dae950a38f413fe3eed10"
              }
          ]
      }
      */
    }
  },
  created () {
    axios.get(`http://localhost:8080/api/v1/items/`)
    .then(response => {
      this.items = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
