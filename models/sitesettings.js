//var mongodb = require('./db');

var crypto = require('crypto'),
	mongoose = require('mongoose');


//mongoose.connect("mongodb://localhost/itbooks");



mongoose.connect('mongodb://lancer07:lancer07@ds039431.mongolab.com:39431/51itbook');
//mongoose.connect('mongodb://user:pass@localhost:port/database');


var siteSettings = new mongoose.Schema({
	id : String,
	siteTitle : String,
	siteKeywords : String,
	siteDescription : String,
	siteCorpright : String
},{
	collection : "sitesettings"
})

var siteSettingsModel = mongoose.model('sitesettings',siteSettings);

function SiteSettings(setting){
	this.id = 0;
	this.siteTitle = setting.siteTitle;
	this.siteKeywords = setting.siteKeywords;
	this.siteDescription = setting.siteDescription;
	this.siteCorpright = setting.siteCorpright;
};
module.exports = SiteSettings 

SiteSettings.update = function(query,set,callback){		
	siteSettingsModel.update(query,set,{ multi: true },function(err,result){
		callback(null,result);
	});
};

SiteSettings.get = function(query,callback){
	siteSettingsModel.find(query,function(err,result){			
		callback(null,result)
	});
};



