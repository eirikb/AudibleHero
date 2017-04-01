require('angular');
require('angular-ui-router');
require('angular-filter');
require('angular-smart-table');
require('lodash');

var bulk = require('bulk-require');
bulk(__dirname, 'src/**/*js');

document.body.innerHTML = require('./src/index.html');
angular.bootstrap(document, ['audiblehero']);
