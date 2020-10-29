var express = require('express')
var router = express.Router()
var apiRoutesV1 = require('./v1/api')

router.use(require('../plugins/tokenChecker'))
router.use('/v1', apiRoutesV1)

module.exports = router