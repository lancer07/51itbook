var crypto = require('crypto'),
	mongoose = require('mongoose');

var admin = new mongoose.Schema({
    username : String,
    loginpassword : String
},{
	collection : "admin"
})
var adminModel = mongoose.model('admin',admin);


function Admin(admin){
	this.username = admin.username;
	this.loginpassword = admin.loginpassword;
};

module.exports = Admin ;

Admin.get = function(query,callback){
	adminModel.find(query,function(err,result){			
		callback(null,result[0])
	});
}