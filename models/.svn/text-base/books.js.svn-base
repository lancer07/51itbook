var crypto = require('crypto'),
	mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/itbooks");


var books = new mongoose.Schema({
    id : String,
    name : String,
    info : String,
    src : String,
    star : String,
    download : String,
    password: String
},{
	collection : "books"
})
var booksModel = mongoose.model('books',books);


function Books(book){
	this.name = book.name;
	this.info = book.info;
	this.src = book.src;
	this.star = book.star;
	this.download = book.download;
	this.password = book.password;

};

module.exports = Books ;

Books.prototype.save = function(callback){
	var date = new Date();
	var time = {
		date : date,
		year : date.getFullYear(),
		month : date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1),
		day : date.getDate() < 10 ? "0"+date.getDate() : date.getDate() ,
		hour : date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
		minute : date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
		second : date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()
	}
	var id = "book" + time.year + time.month + time.day + time.hour + time.minute + time.second;
	var book = {
		id: id,
		name : this.name,
		info : this.info,
		src: this.src,
		star: this.star,
		download : this.download,
		password : this.password
	};

	booksModel.create(book, function (err,result) {  
		callback(null,result);
	}); 
};

Books.get = function(query,callback){
	booksModel.find(query,function(err,result){			
		callback(null,result)
	});
}

Books.update = function(query,set,callback){
	booksModel.update(query,set,{ multi: true },function(err,result){
		callback(null,result);
	});
};

Books.remove = function(query,callback){
	booksModel.remove(query,function(err){
		callback(null)
	})
}




