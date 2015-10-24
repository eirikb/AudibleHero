angular.module('audiblehero').config(function ($stateProvider) {
  $stateProvider.state('about', {
    url: "/about",
    template: require('./about.html')
  });
});
