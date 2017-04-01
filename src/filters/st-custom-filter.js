angular.module('audiblehero').filter('stCustomFilter', function ($filter, _) {

  var filterFilter = $filter('filter');
  var standardComparator = function standardComparator(obj, text) {
    text = ('' + text).toLowerCase();
    return ('' + obj).toLowerCase().indexOf(text) > -1;
  };

  return function customFilter(array, expression) {
    function customComparator(actual, expected) {
      if (_.isObject(expected)) {
        if (!_.isUndefined(expected.boolean)) {
          if (expected.boolean === null) return true;

          actual = !!(/true/i.exec(actual));
          return actual === expected.boolean;
        }
      }
      return standardComparator(actual, expected);
    }

    var output = filterFilter(array, expression, customComparator);
    return output;
  };
});