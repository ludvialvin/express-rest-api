const jwt = require('jsonwebtoken')
const config = require('../config/config.json')

module.exports = (req,res,next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){

    //split the space at the bearer
    const bearer = bearerHeader.split(' ');
    //Get token from string
    const bearerToken = bearer[1];

    //set the token
    token = bearerToken;

  }
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.tokenSecret, function(err, decoded) {
      if (err) {
        return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}