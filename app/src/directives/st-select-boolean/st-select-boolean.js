angular.module('audiblehero').directive('stSelectBoolean', function (_) {
  return {
    restrict: 'E',
    require: '^stTable',
    scope: {
      predicate: '@',
      predicateExpression: '='
    },
    template: require('./st-select-boolean.html'),
    link: function (scope, element, attr, table) {
      var getPredicate = function () {
        var predicate = scope.predicate;
        if (!predicate && scope.predicateExpression) {
          predicate = scope.predicateExpression;
        }
        return predicate;
      };

      scope.options = [{key: null, value: 'All'}, {key: true, value: 'Yes'}, {key: false, value: 'No'}];
      scope.selected = _.first(scope.options);

      scope.optionChanged = function (selected) {
        var predicate = getPredicate();

        var query = {
          boolean: selected.key
        };
        table.search(query, predicate);
      };
    }
  };
});
