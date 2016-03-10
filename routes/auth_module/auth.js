var jwt = require('jwt-simple');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    salt = 'd6F3Efeq';

var auth = {  

  login: function(req, res) {
 
    var username = req.body.username || '';
    var password = encrypt(req.body.password) || '';
    
    console.log(password);

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    
    var type = 'water';
    db.view('pokemon', 'by_type', {'key': type, 'include_docs': true}, function(err, body){
        
        if(!err){
            var rows = body.rows; //the rows returned
        }
        
        }
    );

    users.find({username: username, password: password},function(err,user){
      console.log(user);
      if(user.length){       
                res.json(genToken(user));
                return;
            } else {
                res.status(401);
                res.json({
                  "status": 401,
                  "message": "Invalid credentials"
                });
                return;
            }
        
    }); 

  },
  current_user: function(req,res){
    res.json({'user' : req.user[0]})
  }
}
 
// private method

// encypt password 

 function encrypt(text){
    var cipher = crypto.createCipher(algorithm,salt)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    id: user[0].id
  }, require('../../config/secret')());
 
  return {
    token: token,
    expires: expires,
    username: user[0].username,
    error: false
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;