var app = require('../app.js');

app.directive('tableview', function () {
  return {
    scope: {
      books: '='
    },
    template: require('../tpl/directives/tableview.html')
  };
});