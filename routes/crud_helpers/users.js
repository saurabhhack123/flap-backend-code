var user   =   require("../../models/user");

var users = {
 
  getAll: function(req, res) {
     user.find({},function(err,data){
      if(err){
                response = {"error" : true,"message" : "Error fetching users"};
            } else {
                response = {"error" : false,"users" : data};
            }
            res.json(response);
    }); 
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    user.find({_id:id},function(err,data){

      if(err){
                response = {"error" : true,"message" : "Error fetching user"};
            } else {
                response = {"error" : false,"user" : data};
            }
            res.json(response);
    });
  },
 
  create: function(req, res) {
    var usr = new user(req.body);
 
    usr.save(function(err){
        if(err)
            response = {"error" : true,"message" : "Error in creating user"};
        else
            response = {"error" : false,"user" : usr};

        res.json(response);
    });
  },
 
  update: function(req, res) {
    var updateUser = req.body;
    var id = req.params.id;
    user.update({_id : {$eq: id}}, {$set: updateUser}, function(err, result){
     
      if(err)
            response = {"error" : true,"message" : "Error in updaing user"};
      else
            response = {"error" : false,"user" : result};

      res.json(response);   
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    user.find({ _id:id }).remove(function(err,result){
      
      if(err)
            response = {"error" : true};
      else
            response = {"error" : false};
     
     res.json(response);
    });
  }
};
 

module.exports = users;
