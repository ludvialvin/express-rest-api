var express = require('express')
var router = express.Router()

require('./articles')(router)
require('./users')(router)

module.exports = router