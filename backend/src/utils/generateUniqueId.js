const crypto = require('crypto')

module.exports = function gerateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}