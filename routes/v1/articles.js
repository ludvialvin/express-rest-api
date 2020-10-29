var express = require('express')
var router = express.Router()

module.exports = function(router){
    const articleService = require('../../app/v1/controller/article.controller.js');
    router.get("/articles", articleService.findAll);
}