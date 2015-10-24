var app = require('../../app.js');

app.config(function ($stateProvider) {
  $stateProvider.state('about', {
    url: "/about",
    template: require('./about.html')
  });
});
