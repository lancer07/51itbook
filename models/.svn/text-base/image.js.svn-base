var mongodb = require('./db');

function Image(art){
	this.author = art.author;
	this.src = art.src;
};

module.exports = Image ;

Image.prototype.save = function(callback){
	
	var img = {
		author : this.author,
		src : this.src
	};

	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('images',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(img,{
				safe:true
			},function(err,img){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,img[0]);
			});
		});
	})
};

Image.get = function(query,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('images',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.find(query).sort({
				time : -1
			}).toArray(function(err,docs){
				
				mongodb.close();
				if(err){
					return callback(err);
				}				
				callback(null,docs)
			});
		});
	});
};


Image.remove = function(query,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('images',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.remove(query,{
				w:1
			},function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null)
			})
		});
	});
};

