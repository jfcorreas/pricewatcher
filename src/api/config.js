exports.production = {
  mongodb_options : {
      server:
        { socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }},
      replset:
        { socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS : 30000
        }}
      },
  mongodbURI: '???????????????'
}

exports.debug = {
  mongodb_options : {
    useMongoClient: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries : 2
  },
  mongodbURI: 'mongodb://admin:pwadmin@ds157833.mlab.com:57833/pricewatcher'
}
