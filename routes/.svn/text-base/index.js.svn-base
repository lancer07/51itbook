
/*
 * GET home page.
 */

module.exports = function(app){

	//app start

	app.get('/',function(req, res){
		SiteSettings.get({
			id : 0
		},function(err,settings){
			res.render('font/index', { 
				siteTitle : settings[0].siteTitle,
				siteKeywords : settings[0].siteKeywords,
				siteDescription : settings[0].siteDescription,
				siteCorpright : settings[0].siteCorpright
			});
		});
	});

	app.post('/list',function(req, res){

		var searchWord = req.param('searchWord');

		var searchWordArr = searchWord.split(" ");

		Books.get({


		 	name : new RegExp(""+searchWord +"","gi")
		},function(err,books){			
			SiteSettings.get({
				id : 0
			},function(err,settings){
				res.render('font/list', { 
					siteTitle : settings[0].siteTitle,
					siteKeywords : settings[0].siteKeywords,
					siteDescription : settings[0].siteDescription,
					siteCorpright : settings[0].siteCorpright,
					searchWord : req.param('searchWord'),
					books : books
				});
			});

			if(books.length == 0){
							
			}			
		});

	});
	
	app.get('/result/:id',function(req, res){
		Books.get({	
			id : req.params.id
		},function(err,book){


			SiteSettings.get({
				id : 0
			},function(err,settings){
				res.render('font/result', { 
					siteTitle : settings[0].siteTitle,
					siteKeywords : settings[0].siteKeywords,
					siteDescription : settings[0].siteDescription,
					siteCorpright : settings[0].siteCorpright,
					bookId: book[0].id,
					bookTit : book[0].name,
					bookInfo : book[0].info,
					bookStar: book[0].star,
					bookSrc: book[0].src,
					bookDownload : book[0].download,
					bookPassword : book[0].password,
					bookComments : book[0].comments
				});
			});
		});
	});
	
	//admin start

	app.get('/logout',function(req, res){
		req.session.admin = null;
		res.redirect('/admin/');
	});


	app.get('/admin',function(req, res){
		res.render('admin/login');
	});

	app.post('/admin',function(req, res){
		var name = req.body.username,
		loginpassword = req.body.loginpassword;

		var md5 = crypto.createHash('md5'),
			loginpassword = md5.update(req.body.loginpassword).digest('hex');
		Admin.get({
			id : "0"
		},function(err,admin){
			if(admin.username != name){
				req.flash('error',"此用户不存在");
				return res.redirect('/admin/msg');
			}

			if(admin.loginpassword != loginpassword){
				req.flash('error',"密码错误");
				return res.redirect('/admin/msg');
			}
			req.session.admin = true;
			//req.flash('success','登录成功');
			return res.redirect('/admin/list');
		});
	});

	app.get('/admin/msg',function(req, res){
		res.render('admin/msg', { 
			error: req.flash('error').toString() ,
			success: req.flash('success').toString() 
		});
	});

	
	app.get('/admin/settings',function(req, res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		SiteSettings.get({
			id : 0
		},function(err,settings){
			res.render('admin/settings', { 
				siteTitle : settings[0].siteTitle,
				siteKeywords : settings[0].siteKeywords,
				siteDescription : settings[0].siteDescription,
				siteCorpright : settings[0].siteCorpright
			});
		});
	});

	app.post('/admin/settings',function(req, res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		SiteSettings.update({
			id : 0,
		},{
			$set : {
				siteTitle : req.body.siteTitle,
				siteKeywords : req.body.siteKeywords,
				siteDescription : req.body.siteDescription,
				siteCorpright : req.body.siteCorpright
			}
		},function(){
			req.flash('success','修改成功!');
			return res.redirect('admin/msg');
		});
	});

	app.get('/admin/list',function(req, res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		Books.get({	
			
		},function(err,books){
			res.render('admin/list', {
				books : books
			});
		});
	});

	app.post('/admin/list',function(req, res){
		Books.get({	
			name : new RegExp(req.param('searchWord'),"gi")
		},function(err,books){
			res.render('admin/list', {
				books : books
			});
		});

	});

	app.get('/admin/add',function(req, res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		res.render('admin/add', {
			books : {
				id: "",
				name : "",
				info : "",
				star: "",
				src: "",
				download : "",
				password : "",
			}
		});
	});
	
	app.post('/admin/add',function(req, res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		for(var i in req.files){
			if(req.files[i].size == 0){
				fs.unlinkSync(req.files[i].path);
			}
			
			var newBook = new Books({
				src : req.files[i].path.slice(6),
				name : req.body.bookName,
				info : req.body.bookInfo,
				star : req.body.bookStar,
				download : req.body.bookDownload,
				password:req.body.bookPassword
			});

			newBook.save(function(err){
				req.flash('success','发布成功!');
				return res.redirect('admin/msg');
			})
		}
	});

	
	app.get('/admin/update/:id',function(req, res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		Books.get({	
			id : req.params.id
		},function(err,books){
			res.render('admin/add', {
				books : books[0]
			});
		});
	});

	app.post('/admin/update/:id',function(req, res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		for(var i in req.files){
			var uploadData = {};
			if(req.files[i].size == 0){
				uploadData = {
					name : req.body.bookName,
					info : req.body.bookInfo,
					star : req.body.bookStar,
					download : req.body.bookDownload,
					password:req.body.bookPassword
				}
			}else{
				uploadData = {
					src : req.files[i].path.slice(6),
					name : req.body.bookName,
					info : req.body.bookInfo,
					star : req.body.bookStar,
					download : req.body.bookDownload,
					password:req.body.bookPassword
				}
			}
			Books.update({
				id : req.body.bookId
			},{
				$set : uploadData
			},function(){
				req.flash('success','修改成功!');
				return res.redirect('admin/msg');
			});
		}
	});

	
	app.get('/admin/remove/:id',function(req,res){
		if(!req.session.admin){	return res.redirect('/admin/');	}
		Books.remove({
			id : req.params.id
		},function(err){
			req.flash('success','删除成功!');
			return res.redirect('admin/msg');
		});
	});
	//admin end
};



var crypto = require('crypto'),
	fs = require('fs'),
	SiteSettings = require('../models/sitesettings.js'),
	Books = require('../models/books.js'),
	Admin = require('../models/admin.js');

function checkLogin(req,res){
	if(!req.session.admin){
		req.flash('error',"未登录");
		return res.redirect('/admin/');
	}
}

function checkNotLogin(req,res){
	if(req.session.admin){
		req.flash('error',"已登录");
		res.redirect('/');
	}
}




