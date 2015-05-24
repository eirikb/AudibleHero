var app = require('../app.js');

app.directive('grouped', function () {
  return {
    scope: {
      grouped: '='
    },
    template: require('../tpl/directives/grouped.html')
  }
});
