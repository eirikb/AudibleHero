// This hack is used to make @material/...-modules to load
const path = require('path');
const cwd = process.cwd();

module.exports = {
  includePaths: [path.resolve(cwd, 'node_modules'), path.resolve(cwd, 'src')],
};
