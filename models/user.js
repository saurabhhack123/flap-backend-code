var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({ 
    username: { type:String, required:true ,index: true, unique: true},
    password: { type:String, required:true ,minlength: 6},
    name:     { type:String, required:true },
    role:     { type:String, required:true },
    time:     { type : Date, default: Date.now },
    user_info:{
    	school_id: { type:Number },
    	full_address: { 
    		          address:{ type:String },
				      city:{ type:String },
				      state:{ type:String },
				      country:{ type:String },
				      pincode:{ type:Number }
				      },
    	dob:{type:Date},
    	gender:{type:String},
    	mobile:{type:Number,required:true}
    }
}));