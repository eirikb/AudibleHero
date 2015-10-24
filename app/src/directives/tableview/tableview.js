angular.module('audiblehero').directive('tableview', function () {
  return {
    scope: {
      books: '='
    },
    template: require('./tableview.html')
  };
});