const User = require("../services/user.services.js");

exports.findOne = (req, res) => {
    User.findByName(req.body.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with name ${req.body.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with name " + req.body.username
        });
      }
    } else res.send(data);
  });
};