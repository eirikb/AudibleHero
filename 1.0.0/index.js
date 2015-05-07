require('angular');
require('angular-ui-router');
require('angular-bootstrap');

$('.main_Content').html(require('./src/tpl/index.html'));
var bulk = require('bulk-require');
bulk(__dirname, 'src/**/*js');

angular.bootstrap(document, ['audiblehero']);
