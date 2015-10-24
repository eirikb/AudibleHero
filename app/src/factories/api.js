angular.module('audiblehero').factory('api', function ($q) {
  var resolve;

  document.addEventListener('audibleHeroC', function (e) {
    resolve && resolve(e.detail);
  });

  return function (name, type, data) {
    return $q(function (r) {
      resolve = r;
      document.dispatchEvent(new CustomEvent('audibleHeroS', {
        detail: {
          name: name,
          type: type,
          data: data
        }
      }));
    });
  }
});