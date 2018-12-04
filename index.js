module.exports = {};

module.exports.Model = require('./lib/Model').default;
module.exports.Person = require('./lib/core-types/Person').default;

module.exports.q = require('./lib/query/Query').default;
module.exports.qr = require('./lib/query/QueryRule').default;
module.exports.qrModel = require('./lib/Model').qrModel;
module.exports.t = require('tcomb-validation');
module.exports.tModel = require('./lib/Model').tModel;
