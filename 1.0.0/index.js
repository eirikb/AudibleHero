require('angular');
require('angular-ui-router');
require('angular-bootstrap');
require('angular-filter');
require('lodash');

var bulk = require('bulk-require');
bulk(__dirname, 'src/**/*js');

$('#mast-member').prepend($(require('./src/tpl/button.html')).one('click', function () {
  $(this).addClass('active');
  $('.main_Content').html(require('./src/tpl/index.html'));
  $('.reg-footer-wide').remove();
  angular.bootstrap(document, ['audiblehero']);
}));

$(function() {
  $('.main_Content').html(require('./src/tpl/index.html'));
  $('.reg-footer-wide').remove();
  angular.bootstrap(document, ['audiblehero']);
});
