angular.module('audiblehero').directive('filteredItems', function () {
  return {
    require: '^stTable',
    scope: {
      'filteredItems': '='
    },
    link: function (scope, element, attr, table) {
      scope.$watch(table.getFilteredCollection, function (val) {
        scope.filteredItems = val;
      });
    }
  };
});