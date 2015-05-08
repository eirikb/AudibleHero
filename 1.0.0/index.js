require('angular');
require('angular-ui-router');
require('angular-bootstrap');

var bulk = require('bulk-require');
bulk(__dirname, 'src/**/*js');

$('#mast-member').prepend($('<a href>').text('AudibleHero!').click(function () {
  $('.main_Content').html(require('./src/tpl/index.html'));
  angular.bootstrap(document, ['audiblehero']);
}));
