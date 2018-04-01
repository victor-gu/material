var bodyParser = require('body-parser');
var url = require('url');
var jwt = require('jsonwebtoken');

module.exports = function(app, port){
	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    if(req.method=="OPTIONS") {
	      	res.sendStatus(200);/*让options请求快速返回*/
	    } else{
	      	next();
	    }
	});

	app.use(bodyParser.urlencoded({extended: false}));

	//过滤器
	app.use(function(req, res, next){
		next();
		// if(!req.session.name && url.parse(req.url).pathname != "/login"){
		// 	next('{state: false, message: "当前没有权限访问"}');
		// } else {
		// 	next();
		// }

		// var token = req.headers['Authorization'];
		// jwt.verify(token, 'secret', function(error, result){
		// 	if(error){
		// 		res.send({status: false, message: error});
		// 	} else {
		// 		res.send({status: true});
		// 	}
		// })	

		// var uesr = {
		// 	username: req.body.username,
		// }

		// var token = jwt.sign(user, 'secret', {
		// 	'expiresIn': 1440 // 设置过期时间
		// })				
	})	
	app.listen(port, function(){
		console.log('http://localhost:88 started');
	});
}