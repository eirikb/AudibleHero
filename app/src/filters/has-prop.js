angular.module('audiblehero').filter('hasProp', function (_) {
  return function (input, prop) {
    return _.filter(input, function (i) {
      return !!i[prop];
    });
  };
});
