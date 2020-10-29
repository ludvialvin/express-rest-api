var express = require('express')
var router = express.Router()

module.exports = function(router){
    const userService = require('../../app/v1/controller/user.controller.js');
    router.post("/users", userService.findOne);
}