var app = require('../app.js');

app.config(function ($stateProvider) {
  $stateProvider.state('load', {
    template: require('../tpl/states/load.html'),
    controller: function ($scope, $state, getLibraryBooks, getBooksByAuthor, $q, $log, version, api) {

      $scope.calcProgress = function () {
        var aa = $scope.authors;
        if (!_.isArray(aa)) return 0;
        return Math.floor(_.filter(aa, function (a) {
            return !!a.bookCount;
          }).length / aa.length * 100);
      };

      $scope.active = -1;

      $scope.start = function () {
        $scope.active = 0;
        getLibraryBooks().then(function (libraryBooks) {
          $scope.bookCount = libraryBooks.length;
          $scope.active = 1;
          $scope.authors = _(libraryBooks).pluck('authors').flatten().uniq().compact().map(function (author) {
            return {
              name: author,
              loading: true
            }
          }).value();
          $q.all(_.map($scope.authors, function (author) {
            return getBooksByAuthor(author.name).then(function (books) {
              author.loading = false;
              author.bookCount = books.length;
              return books;
            });
          })).then(function (allBooks) {
            $scope.active = 2;

            allBooks = _(allBooks).flatten().uniq('id').value();

            _.each(libraryBooks, function (libraryBook) {
              var book = _.find(allBooks, {id: libraryBook.id});
              if (!book) {
                $log.warn('Book not found!, trying by title', libraryBook);
                book = _.find(allBooks, {title: libraryBook.title});
                if (book) book.notFound = true;
              }
              if (book) {
                book.owned = true;
                _.assign(book, libraryBook);
              } else {
                $log.warn('Book not found at all! :O', libraryBook);
              }
            });

            api('clearAndSave', 'local', {
              version: version,
              updated: Date.now(),
              books: allBooks
            }).then(function () {
              $state.go('app');
            });
          });
        });
      };
    }
  });
});
