const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const knex = require("../plugins/db.js")
const config = require("../config/config.json")
const CryptoJS = require("crypto-js")
const helper = require('../helper/main_helper.js')

router.post('/login', async (req,res) => {
    var resData = req.body;
    var username = resData.username;
    var password = resData.password;
    var md5Hash = CryptoJS.MD5(password).toString();
    try {
        let resData = await knex('sys_user').where('name', username).where('password', md5Hash);
        if(resData.length > 0){
            let extToken = await knex('sys_token').where('user_id', resData[0].id);
            if(extToken.length > 0){
                const newToken = jwt.sign({username}, config.tokenSecret, {expiresIn: config.tokenLife});
                const newRefreshToken = jwt.sign({username}, config.refreshTokenSecret, {expiresIn: config.refreshTokenLife});
                const modifiedDatetime = helper.getDatetime;
                knex('sys_token').where('user_id', resData[0].id).update({ access_token: newToken, modified_datetime: modifiedDatetime })
                .then(function(affectedRow){
                    if(affectedRow){
                        res.status(200).send({
                            code: "200",
                            status: "success",
                            message: "success update token",
                            access_token: newToken,
                            refresh_token: newRefreshToken
                        });
                    }  
                })
                .catch(function(err){
                    res.status(500).send({
                        code: "500",
                        status: "failed",
                        message: "Error update Token User with name " + username
                    });
                }); 
            }else{
                const newToken = jwt.sign({username}, config.tokenSecret, {expiresIn: config.tokenLife});
                const newRefreshToken = jwt.sign({username}, config.refreshTokenSecret, {expiresIn: config.refreshTokenLife});
                const createdDatetime = helper.getDatetime;
                knex('sys_token').insert({ user_id: resData[0].id, access_token: newToken, refresh_token: newRefreshToken, created_datetime: createdDatetime })
                .then(function(affectedRow){
                    if(affectedRow){
                        res.status(200).send({
                            code: "200",
                            status: "success",
                            message: "success create token",
                            access_token: newToken,
                            refresh_token: newRefreshToken
                        });
                    }  
                })
                .catch(function(err){
                    res.status(500).send({
                        code: "500",
                        status: "failed",
                        message: "Error insert Token User with name " + username
                    });
                });   
            }
        }else{
            res.send({
                code: "200",
                status: "failed",
                message: "User not found"
            });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            code: "500",
            status: "failed",
            message: "Error retrieving User with name " + username
        });
    }
})

router.post('/refresh', async (req,res) => {
    // refresh the damn token
    const postData = req.body

    if((postData.refreshToken)) {
        try {
            let extToken = await knex('sys_token').where('refresh_token', postData.refreshToken);
            if(extToken.length > 0){
                let resUser = await knex('sys_user').where('id', extToken[0].user_id);
                if(resUser.length > 0){
                    const username = resUser[0].name;
                    const newToken = jwt.sign({username}, config.tokenSecret, {expiresIn: config.tokenLife});
                    const newRefereshToken = jwt.sign({username}, config.refreshTokenSecret, {expiresIn: config.refreshTokenLife});
                    const modifiedDatetime = helper.getDatetime;
                    knex('sys_token').where('user_id', resUser[0].id).update({ access_token: newToken, refresh_token: newRefereshToken, modified_datetime: modifiedDatetime })
                    .then(function(affectedRow){
                        if(affectedRow){
                            console.log('refresh done')
                            res.status(200).send({
                                code: "200",
                                status: "success",
                                message: "success update token",
                                access_token: newToken,
                                refresh_token: newRefereshToken
                            });
                        }  
                    })
                    .catch(function(err){
                        res.status(500).send({
                            code: "500",
                            status: "failed",
                            message: "Error update Token User with name " + username
                        });
                    });
                }else{
                    res.status(404).send({
                        code: "404",
                        status: "failed",
                        message: "User not found"
                    });
                }
            }else{
                res.status(404).send({
                    code: "404",
                    status: "failed",
                    message: "Token not found"
                });   
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send({
                code: "500",
                status: "failed",
                message: "Error retrieving Token with Refresh Token " + postData.refreshToken
            });
        }
    }else{
        res.status(404).send({
            code: "404",
            status: "failed",
            message: "Refresh Token not found"
        });
    }    
})

module.exports = router