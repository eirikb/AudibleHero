var app = require('../app.js');

app.directive('filterControl', function () {
  return {
    scope: {
      filter: '='
    },
    template: require('../tpl/directives/filter-control.html')
  }
});
