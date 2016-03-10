var school   =   require("../../models/school");

var schools = {

  getAll: function(req, res) {

    school.find({},function(err,data){
      if(err){
                response = {"error" : true,"message" : "Error fetching schools"};
            } else {
                response = {"error" : false,"schools" : data};
            }
            res.json(response);
    });    
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    school.find({_id:id},function(err,data){

      if(err){
                response = {"error" : true,"message" : "Error fetching school"};
            } else {
                response = {"error" : false,"school" : data};
            }
            res.json(response);
    });
  },
 
  create: function(req, res) {
    console.log(req.body["school"]);

    var sch = new school(req.body["school"]);
 
    sch.save(function(err){
        console.log(err);
        if(err)
            response = {"error" : true,"message" : "Error in creating school"};
        else
            response = {"error" : false,"school" : sch};

        res.json(response);
    });

  },
 
  update: function(req, res){
    
    var updateSchool = req.body;
    var id = req.params.id;
    school.update({_id : {$eq: id}}, {$set: updateSchool}, function(err, result){
     
      if(err)
            response = {"error" : true,"message" : "Error in updaing school"};
      else
            response = {"error" : false,"school" : result};

      res.json(response);   
    });
    
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    school.find({ _id:id }).remove(function(err,result){
      
      if(err)
            response = {"error" : true};
      else
            response = {"error" : false};
     
     res.json(response);
    });
 
  }
};

module.exports = schools;