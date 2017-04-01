angular.module('audiblehero').config(function ($stateProvider) {
  $stateProvider.state('app.allbooks', {
    url: "allbooks",
    require: '`stTable',
    template: require('./all-books.html'),
    controller: function ($scope, saveIgnored, _) {
      $scope.displayBooks = [].concat($scope.books);

      $scope.toggleIgnore = function (book) {
        book.ignored = !book.ignored;
        saveIgnored();
      };

      $scope.filterByNewBooks = function () {
        $scope.downloaded = false;
        $scope.missing = true;
        $scope.ignored = false;
        $scope.incognito = null;
      };

      $scope.ignoreBooks = function (books) {
        if (!confirm('You are about to ignore ' + books.length + ' books, continue?')) return;

        _.each(books, function (book) {
          book.ignored = true;
        });
        saveIgnored();
      };
    }
  });
});
