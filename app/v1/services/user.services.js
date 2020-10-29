const knex = require("../../../plugins/db.js");

const User = function(user) {};

User.findByName = async (userName, result) => {
    try {
        let resUser = await knex('sys_user').where('name', userName);
        result(null, resUser)
    }
    catch (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }
};

module.exports = User;
