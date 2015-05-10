var app = require('../app.js');
require('lodash');

function getAuthors(books) {
  return _(books).map(function (book) {
    return book.author.split(',');
  }).flatten().uniq().map(function (author) {
    author = {
      name: author,
      loading: true
    };
    return author;
  }).value();
}

app.config(function ($stateProvider) {
  $stateProvider.state('load', {
    template: require('../tpl/states/load.html'),
    controller: function ($scope, $state, getLibraryBooks, getBooksByAuthor, $q, version) {

      $scope.calcProgress = function () {
        var aa = $scope.authors;
        if (!_.isArray(aa)) return 0;
        return Math.floor(_.filter(aa, function (a) {
            return !!a.bookCount;
          }).length / aa.length * 100);
      };

      $scope.active = 0;
      getLibraryBooks().then(function (books) {
        $scope.bookCount = books.length;
        $scope.active = 1;
        $scope.authors = getAuthors(books);
        $q.all(_.map($scope.authors, function (author) {
          return getBooksByAuthor(author.name).then(function (books) {
            author.loading = false;
            author.bookCount = books.length;
            return books;
          });
        })).then(function (allBooks) {
          $scope.active = 2;

          allBooks = _.flatten(allBooks);

          _.each(allBooks, function (book) {
            var libraryBook = _.find(books, {id: book.id});
            if (libraryBook) {
              book.owned = true;
              _.assign(book, libraryBook);
            }
          });

          localStorage.data = JSON.stringify({
            version: version,
            updated: new Date(),
            books: allBooks
          });
          $state.go('app');
        });
      });
    }
  });
});
