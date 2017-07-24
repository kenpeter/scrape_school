// module
// exports config
module.exports = {
  // mongo, obj
  mongo: {
    // db name
    name: 'scrape_school',
    // localhost
    host: '127.0.0.1',
    // port
    port: 27017,
    // username
    username: 'scrape_school',
    // password
    password: 'scrape_school',
    url: function() {
      return ['mongodb://',
        this.username, ':',
        this.password, '@',
        this.host, ':', this.port, '/', this.name].join('');
    }
  },
  mongoOptions: {
    server: {
      poolSize: 1,
      socketOptions: {
        auto_reconnect: true
      }
    }
  },
  geocodekey: 'AIzaSyDf2wvPb9L9_xbVwiB_ZdzxqwLClE9e-30'
}
