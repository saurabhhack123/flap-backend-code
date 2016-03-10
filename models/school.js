var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('School', new Schema({ 
    name: { type: String,required:true },
    short_name : { type:String,required:true},
    full_address: { 
    		        address:{ type:String },
				    city:   { type:String },
				    state:  { type:String },
				    country:{ type:String },
				    pincode:{ type:Number }
				   },
    locked:    { type:Boolean,required:true,default:0 },
    sender_id  :{ type:String },
    contact_person:{ type:String },
    email:{ type:String ,validate : /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ },
    time: { type : Date, default: Date.now }
}));
