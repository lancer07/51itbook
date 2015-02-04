
/*
 * GET home page.
 */

module.exports = function(app){

	app.get('/',function(req, res){
		res.render('index', { 
			title: '主页' ,
			user:req.session.user
		});
	});

	app.get('/msg',function(req, res){
		res.render('msg', { 
			error: req.flash('error').toString() ,
			success: req.flash('success').toString() 
		});
	});

	//app.get('/login',checkNotLogin);
	app.get('/login',function(req, res){
		res.render('login', { 
			title: '登录',
			user:req.session.user,
			error: req.flash('error').toString() ,
			success: req.flash('success').toString()
		});
	});

	app.post('/login',function(req, res){
		var name = req.body.name,
		password = req.body.password;

		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');

		User.get(name,function(err,user){
			if(!user){
				req.flash('error',"此用户不存在");
				return res.redirect('/login');
			}
			if(user.password != password){
				req.flash('error',"密码错误");
				return res.redirect('/login');
			}
			req.session.user = user;
			req.flash('success','登录成功');
			return res.redirect('/');

		});
	});

	app.get('/logout',function(req, res){
		res.render('logout',{});
		req.session.user = null
	});

	//app.get('/reg',checkNotLogin);
	app.get('/reg',function(req, res){
		res.render('reg', { 
			title: '注册',
			user:req.session.user,
			error: req.flash('error').toString() ,
			success: req.flash('success').toString() 
		});
	});

	app.post('/reg',function(req, res){
		var name = req.body.name,
		password = req.body.password,
		re_password = req.body.password_repeat,
		email = req.body.email;

		if(re_password != password){
			req.flash('error','两次输入的密码不一致！')
			return res.redirect('/reg');
		}

		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');

		var newUser = new User({
			name : name,
			password : password,
			email: email
		});

		User.get(newUser.name,function(err,user){
			if(user){
				req.flash('error','用户名已存在！')
				return res.redirect('/reg');
			}

			newUser.save(function(err,user){
				req.session.user = user;
				req.flash('success','注册成功!');
				return res.redirect('/msg');
			})

		});
	});

	app.get('/article',checkLogin);
	app.get('/article',function(req, res){
	
		Article.get({
			id : req.query.id
		},function(err,articles){

			if(err){
				articles = []
			}
			res.render('article', { 
				user:req.session.user,
				articles : articles
			});
		});
	});
	
	app.get('/article_list',checkLogin);
	app.get('/article_list',function(req, res){
		Article.get({
			autwhor : req.session.user.name
		},function(err,articles){
			if(err){
				articles = []
			}
			res.render('article_list', { 
				user:req.session.user,
				title : "我的文章",
				articles : articles
			});
		});
	});

	app.get('/article_del',checkLogin);
	app.get('/article_del',function(req,res){
		Article.remove({
			id : req.query.id
		},function(err){
			req.flash('success','删除成功!');
			return res.redirect('/msg');
		});
	});

	app.get('/article_edit',checkLogin);
	app.get('/article_edit',function(req,res){
		Article.get({
			id : req.query.id
		},function(err,articles){
			if(err){
				articles = []
			}

			res.render('post', { 
				user:req.session.user,
				title : "重新编辑",
				articles : articles
			});
		});
	});

	app.post('/article_edit',function(req, res){
		Article.update({
			id : req.query.id,
		},{
			$set : {
				tit : req.body.article_tit,
				cot : req.body.article_cot
			}
		},function(){
			req.flash('success','修改成功!');
			return res.redirect('/msg');
		})
	});

	app.get('/post',checkLogin);
	app.get('/post',function(req, res){
		res.render('post', { 
			title: '发表',
			user:req.session.user,
			articles : null,
			error: req.flash('error').toString() ,
			success: req.flash('success').toString(),

		});
	});

	app.post('/post',function(req, res){
		var newArticle = new Article({
			author : req.session.user.name,
			tit : req.body.article_tit,
			cot : req.body.article_cot
		});
		newArticle.save(function(err){
			req.flash('success','发布成功!');
			return res.redirect('/msg');
		})	
	});


	app.get('/img_del',function(req,res){
		fs.unlinkSync("public/"+req.query.src);
		Image.remove({
			author : req.session.user.name,
			src : req.query.src
		},function(err){
			req.flash('success','删除成功!');
			return res.redirect('/msg');
		});

	});

	app.get('/upload',function(req, res){
		

		Image.get({
			author : req.session.user.name
		},function(err,images){
			if(err){
				images = []
			}
			console.log(images)

			res.render('upload', { 
				user:req.session.user,
				title : "我的图片",
				images : images,
				error: req.flash('error').toString() ,
				success: req.flash('success').toString()
			});
		});
	});

	app.post('/upload',checkLogin);
	app.post('/upload',function(req, res){
		for(var i in req.files){
			if(req.files[i].size == 0){
				fs.unlinkSync(req.files[i].path);
			}
			
			var newImage = new Image({
				author : req.session.user.name,
				src : req.files[i].path.slice(6)
			});

			newImage.save(function(err){
				req.flash('success','上传成功');
				return res.redirect('/msg');
			})
		}
	});

};

var crypto = require('crypto'),
	fs = require('fs'),
	User = require('../models/user.js'),
	Article = require('../models/article.js'),
	Image = require('../models/image.js');


function checkLogin(req,res,next){
	if(!req.session.user){
		req.flash('error',"未登录");
		res.redirect('/msg');
	}
	next();
}

function checkNotLogin(req,res,next){
	if(req.session.user){
		//req.flash('error',"已登录");
		res.redirect('/');
	}
	next();
}




