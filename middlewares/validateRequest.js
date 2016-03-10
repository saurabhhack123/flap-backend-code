var jwt = require('jsonwebtoken');
var validateUser = require('../routes/auth_module/auth').validateUser;
var users  =   require("../models/user");

module.exports = function(req, res, next) {
 
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.
  
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  
  if (token) {
    
      jwt.verify(token, require('../config/secret.js')(),function(err,decoded){
        console.log(decoded)
        if(err){
          console.log(err)
          res.status(401)
          res.json({
            "status":401,
            "message":err.message
          })
        }
        else if (decoded.exp <= Date.now()) {
          res.status(400);
          res.json({
            "status": 400,
            "message": "Token Expired"
          });
          return;
        }
        else
        {
          // Authorize the user to see if user can access our resources
          users.find({_id : decoded.id},function(err,user){
          
          if(user.length){       
                  if ((req.url.indexOf('admin') >= 0 && user[0].role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                    req.user = user
                    next(); // To move to next middleware
                    return;
                  } else {
                    res.status(403);
                    res.json({
                      "status": 403,
                      "message": "Not Authorized"
                    });
                    return;
                  }

              }else {
                  res.status(401);
                  res.json({
                  "status": 401,
                  "message": "Invalid User"
                  });
                  return;              
                }     
          });
        }
      });
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};